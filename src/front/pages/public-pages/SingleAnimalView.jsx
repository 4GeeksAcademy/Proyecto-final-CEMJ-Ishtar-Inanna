import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { getAllPetPosts } from "../../services/petPostServices";
import LogoLosAristogatos from "../../assets/img/LogoLosAristogatos.png";
// import { Heart, Share2, MapPin } from "lucide-react";

export const SingleAnimalView = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const id_mascota = state?.id;

    const [petList, setPetList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id_mascota) return;
        (async () => {
            const res = await getAllPetPosts();
            setPetList(res?.pets || []);
            setLoading(false);
        })();
    }, [id_mascota]);

    const enriched = useMemo(
        () =>
            petList.map((p) => ({
                ...p,
                details: p?.physical_description
                    ? Object.fromEntries(
                        p.physical_description
                            .split("|")
                            .map((s) => s.split(":", 2))
                            .map(([k, v]) => [
                                k.trim(),
                                v?.includes(";")
                                    ? v.split(";").map((x) => x.trim())
                                    : v?.trim() || null,
                            ])
                    )
                    : {},
            })),
        [petList]
    );

    if (loading) return <p className="container py-5">Cargando...</p>;

    const pet = enriched.find((p) => p.id === id_mascota);
    if (!pet) return <p className="container py-5">Mascota no encontrada</p>;

    return (
        <div className="container my-4">
            <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
                ← Volver
            </button>

            <div className="row g-4">
                {/* MAIN CONTENT */}
                <div className="col-lg-8">
                    <div className="card shadow-sm mb-4">
                        <img
                            src={pet.image_url || "https://placehold.co/1200x600?text=Mascota"}
                            className="card-img-top single-pet-img"
                            alt={pet.name}
                        />

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
                                <Info label="Sexo" value={pet.gender || "N/A"} />
                                <Info label="Tamaño" value={pet.details?.Size || "N/A"} />
                                <Info label="Raza" value={pet.species} />
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <Section title="Sobre mí">
                                {pet.description ||
                                    "Esta mascota está buscando un hogar lleno de amor."}
                            </Section>

                            <Section title="Detalles físicos">
                                {pet.details?.Color && (
                                    <div>
                                        <strong>Color:</strong>
                                        <ul>
                                            {pet.details.Color.map((c, i) => (
                                                <li key={i}>{c}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {pet.details?.Marcas && (
                                    <p>
                                        <strong>Marcas:</strong>{" "}
                                        {Array.isArray(pet.details.Marcas)
                                            ? pet.details.Marcas.join(", ")
                                            : pet.details.Marcas}
                                    </p>
                                )}
                                {pet.details?.Pelo && (
                                    <p>
                                        <strong>Pelaje:</strong> {pet.details.Pelo}
                                    </p>
                                )}
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
                                    style={{ width: '40px', height: '40px' }}
                                />
                                Los Aristogatos de Boadilla
                            </h5>

                            <button className="button btn btn-primary w-100 my-2">
                                Iniciar adopción
                            </button>
                            <button className="btn btn-outline-secondary w-100 mb-3">
                                Contactar
                            </button>

                            {/* <div className="d-flex justify-content-between text-muted">
                                <span>
                                    <Heart size={16} /> Favorito
                                </span>
                                <span>
                                    <Share2 size={16} /> Compartir
                                </span>
                            </div> */}
                        </div>
                    </div>
                    {/* 
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h6 className="fw-semibold">Ubicación</h6>
                            <p className="text-muted d-flex align-items-start gap-1">
                                <MapPin size={16} />
                                {pet.found_location}
                            </p>
                            <div className="map-placeholder">Mapa</div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

const Info = ({ label, value }) => (
    <div className="col-6 col-md-3 mb-2">
        <div className="border rounded py-2">
            <small className="text-muted">{label}</small>
            <div className="fw-semibold">{value}</div>
        </div>
    </div>
);

const Section = ({ title, children }) => (
    <div className="mb-4">
        <h5 className="fw-semibold">{title}</h5>
        <div className="text-muted">
            {children}
        </div>
    </div>
);