import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllPetPosts } from "../../services/petPostServices";
import LogoLosAristogatos from "../../assets/img/LogoLosAristogatos.png";
import Map from "../../components/Map"; // no sirve ya esta el embebed
import { useJsApiLoader } from "@react-google-maps/api";


export const SingleAnimalView = () => {
    const navigate = useNavigate();
    const { state } = useLocation();   // { id: 25 }
    const id_mascota = state?.id;

    // Estado para la dirección en texto
    const [address, setAddress] = useState("Cargando ubicación...");
    const [petList, setPetList] = useState([])
    const [loading, setLoading] = useState(true)

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAJ36Mp6CXQ0u5bZpQuByVe1t5xZMam_bs", // key cambiar 
        id: 'google-map-script'
    });

    const Info = ({ label, value }) => (
        <div className="col-6 col-md-3 mb-2">
            <div className="border rounded py-2">
                <small className="text-muted">{label}</small>
                <div className="fw-semibold">{value}</div>
            </div>
        </div>
    );

    const Section = ({ title, children }) => (
        <div className="mb-3">
            <h6 className="fw-semibold">{title}</h6>
            <div>{children}</div>
        </div>
    );

    const testFetchMascotas = async () => {
        const response = await getAllPetPosts()
        setPetList(response.pets)
    }

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const res = await getAllPetPosts();
                setPetList(res?.pets || []);
            } catch (error) {
                console.error("Error fetching pets:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPets();
    }, []);

    const enriched = petList.map(p => ({
        ...p,
        details: Object.fromEntries(
            p.physical_description
                .split('|')
                .map(s => s.split(':', 2))
                .map(([k, v]) => {
                    const val = v?.includes(';') ? v.split(';') : (v || null);
                    return [k.trim(), val];
                })
        ),
        foundCoords: p.found_location
            ? (() => {
                const [lat, lng] = p.found_location.split(',').map(Number);
                return { lat, lng };
            })()
            : p.actual_location
                ? (() => {
                    const [lat, lng] = p.actual_location.split(',').map(Number);
                    return { lat, lng };
                })()
                : null,
    }));
    console.log(enriched)
    useEffect(() => { testFetchMascotas() }, [])

    const pet = enriched.find(p => p.id === id_mascota);
    useEffect(() => {
        if (isLoaded) {
            if (pet) {
                if (pet.foundCoords) {
                    const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ location: pet.foundCoords }, (results, status) => {
                        if (status === "OK") {
                            if (results[0]) {
                                setAddress(results[0].formatted_address);
                            }
                        } else {
                            console.log("Error al buscar la direccion: " + status);
                            setAddress("No se encontró la dirección");
                        }
                    });
                }
            }
        }
    }, [isLoaded, pet]);

    if (!pet) return <p>Mascota no encontrada</p>;

    return (
        <div className="container">
            <div className="container my-4">
                <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
                    ← Volver
                </button>
            </div>

            <div className="row g-4">
                {/* MAIN CONTENT */}
                <div className="col-md-7">
                    <div className="card shadow-sm mb-4">
                    {Array.isArray(pet.images) && pet.images.length > 0 ? (
                        <div id="carouselExample" className="carousel slide mb-3">
                            <div className="carousel-inner">
                                {pet.images.map((url, index) => (
                                    <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                        <img
                                            src={url}
                                            className="d-block w-100 rounded"
                                            alt={`Imagen ${index + 1} de ${pet.name}`}
                                            style={{ maxHeight: "300px", objectFit: "cover" }}
                                        />
                                    </div>
                                ))}
                            </div>
                            {pet.images.length > 1 && (
                                <>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </>
                            )}
                        </div>
                    ) : (
                        <p>No hay imágenes disponibles</p>
                    )}
                    
                       
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <h2 className="fw-bold mb-0">{pet.name}</h2>
                                    <small className="text-muted">{pet.found_location}</small>
                                </div>
                                <span className="badge bg-success">Adoptable</span>
                            </div>

                            <div className="row text-center mb-4">
                                <Info label="Edad" value={pet.age || "N/A"} />
                                <Info label="Género" value={pet.gender || "N/A"} />
                                <Info label="Raza" value={pet.breed || "N/A"} />
                                <Info label="Especie" value={pet.specie || "N/A"} />
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-sm mb-5">
                        <div className="card-body">
                            <Section title="Sobre mí">
                                {pet.description || "Esta mascota está buscando un hogar lleno de amor."}
                            </Section>

                            <Section title="Detalles físicos">
                                <div>
                                    <ul>
                                        <li>
                                            <h5>Tamaño</h5>
                                            <p>{pet.size}</p>
                                        </li>
                                        <li>
                                            <h5>Tipo de pelaje</h5>
                                            <p>{pet.color}</p>
                                        </li>
                                        <li>
                                            <h5>Otros detalles</h5>
                                            <div>{Array.isArray(pet.marks) && pet.Marks.map(m => <p key={m}>{m}</p>)}</div>
                                        </li>
                                    </ul>
                                </div>
                            </Section>
                        </div>
                    </div>
                </div>

                {/* SIDEBAR */}
                <div className="col-lg-4">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h5 className="fw-semibold d-flex align-items-center gap-2">
                                <img
                                    src={LogoLosAristogatos}
                                    alt="Los Aristogatos logo"
                                    style={{ width: "40px", height: "40px" }}
                                />
                                Los Aristogatos de Boadilla
                            </h5>
                            <button className="btn btn-primary w-100 my-2">Iniciar adopción</button>
                            <button className="btn btn-outline-secondary w-100 mb-3">Contactar</button>
                        </div>
                    </div>
                    <h5>Lugar donde se encontró</h5>
                    <p className="text-muted">
                        {address}
                    </p>
                    {pet.foundCoords ? (
                        <div className="rounded overflow-hidden mb-5" style={{ height: 300 }}>
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAJ36Mp6CXQ0u5bZpQuByVe1t5xZMam_bs&q=${pet.foundCoords.lat},${pet.foundCoords.lng}`}
                            ></iframe>
                        </div>
                    ) : (
                        <p>No se indicó ubicación</p>
                    )}
                </div>
            </div>
        </div>
    );
};