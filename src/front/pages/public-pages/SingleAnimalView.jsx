import { Link } from "react-router-dom";
import { getAllPetPosts } from "../../services/petPostServices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import Map from "../../components/Map"; // no sirve ya esta el embebed
import { useJsApiLoader } from "@react-google-maps/api";


export const SingleAnimalView = () => {

    const { state } = useLocation();   // { id: 25 }
    const id_mascota = state?.id;

    // Estado para la dirección en texto
    const [address, setAddress] = useState("Cargando ubicación...");
    const [petList, setPetList] = useState([])

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAJ36Mp6CXQ0u5bZpQuByVe1t5xZMam_bs", // key cambiar 
        id: 'google-map-script'
    });

    const testFetchMascotas = async () => {
        const response = await getAllPetPosts()
        setPetList(response.pets)
    }

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
        <div className="container py-4 pet-card">
            <div className="row">

                <div className="col-md-7">
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

                    <h5>Especie</h5>
                    <p>{pet.breed}</p>

                    <h5>Tamaño</h5>
                    <p>{pet.details.Tamano}</p>

                    <h5>Tipo de pelaje</h5>
                    <p>{pet.details.Pelo}</p>

                    <h5>Marcas características</h5>
                    <div>
                        {Array.isArray(pet.details.Marcas) &&
                            pet.details.Marcas.map(m => <p key={m}>{m}</p>)}
                    </div>

                    <h5>Colores del animal</h5>
                    <div>
                        {Array.isArray(pet.details.Color) &&
                            pet.details.Color.map(m => <p key={m}>{m}</p>)}
                    </div>
                </div>
                <div className="col-md-4">
                    <h5>Lugar donde se encontró</h5>
                    <p className="text-muted">
                        {address}
                    </p>
                    {pet.foundCoords ? (
                        <div className="rounded overflow-hidden" style={{ height: 300 }}>
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
           <h5>Perfil de usuario</h5>
            <Link
                to="/PublicProfilePage"
                state={{ userId: pet.user.id }}
                className="d-flex align-items-center gap-2 text-decoration-none text-dark"
            >
                <img
                    src={
                        pet.user.prof_img ||
                        `https://ui-avatars.com/api/?name=${pet.user.name}&length=1`
                    }
                    className="rounded-circle border"
                    width="42"
                    height="42"
                    style={{ objectFit: "cover" }}
                />
                <span className="fw-semibold">@{pet.user.username}</span>
            </Link>





        </div>

    );
};