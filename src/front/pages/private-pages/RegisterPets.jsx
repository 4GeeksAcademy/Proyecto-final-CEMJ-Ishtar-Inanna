
import { useState, useEffect } from "react";
import { createPetPost } from "../../services/petPostServices";
import GoogleMapWidget from "../../components/Map";


const LocationPicker = ({ onDone }) => {
    const [show, setShow] = useState(false);
    const [picked, setPicked] = useState(null);

    const handlePick = (lat, lng) => setPicked({ lat, lng });

    const confirm = () => {
        if (!picked) return;
        onDone(`${picked.lat.toFixed(6)}, ${picked.lng.toFixed(6)}`);
        setShow(false);
    };


    return (
        <>
            <button
                type="button"
                className="btn btn-sm btn-outline-primary ms-2"
                onClick={() => setShow(true)}
            >
                Elegir en el mapa
            </button>

            {show && (
                <div
                    className="modal show d-block"
                    tabIndex={-1}
                    style={{ background: "rgba(0,0,0,.45)" }}
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Selecciona una ubicación</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShow(false)}
                                />
                            </div>
                            <div className="modal-body p-0">
                                <GoogleMapWidget onPick={handlePick} />
                                {picked && (
                                    <div className="p-2 small text-muted">
                                        Lat: {picked.lat.toFixed(6)} · Lng: {picked.lng.toFixed(6)}
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShow(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={confirm}
                                    disabled={!picked}
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export const RegisterPets = () => {
    const [open, setOpen] = useState(false);
    const [summary, setSummary] = useState("");

    const [foundLocation, setFoundLocation] = useState("");
    const [actualLocation, setActualLocation] = useState("");
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [foundTime, setFoundTime] = useState("");
    const [isLost, setIsLost] = useState(false);
    const [formData, setFormData] = useState({
        found_location: "",
        actual_location: "",
        found_time: "",
        name: "",
        breed: "",
        physical_description: "",
        is_lost: "",
    });

    useEffect(() => {
        setFormData({
            user_id: localStorage.getItem("user_id"),
            found_location: foundLocation,
            actual_location: actualLocation,
            found_time: foundTime,
            name,
            breed,
            physical_description: summary,
            is_lost: isLost,
        });
    }, [foundLocation, actualLocation, foundTime, name, breed, summary, isLost]);

    useEffect(() => {
        setActualLocation("");
        setFoundLocation("");
    }, [isLost]);

    const sendNewPetPost = async (formData) => {
        await createPetPost(formData);
    };

    const buildString = () => {
        const f = document.getElementById("optionForm");
        const txt = (sel) => (f.querySelector(sel)?.value || "").trim();
        const arr = (name) =>
            [...f.querySelectorAll(name)]
                .filter((c) => c.checked)
                .map((c) => c.value)
                .join(";");
        setSummary(
            [
                "Tamano:" + txt('[name="tamano"]'),
                "Pelo:" + txt('[name="pelo"]'),
                "Color:" + arr('input[name="color"]:checked'),
                "Marcas:" + arr('input[name="marca"]:checked'),
            ]
                .filter(Boolean)
                .join("|")
        );
    };

    return (
        <div className="container d-flex flex-column align-items-center py-5 min-vh-100">
            <div
                className="card shadow-lg rounded-4 p-4 w-100"
                style={{ maxWidth: 480 }}
            >
                <h1 className="text-center mb-4 fw-semibold">Crear registro</h1>

                <div className="my-3">
                    <button
                        className={`btn ${isLost ? "btn-success" : "btn-danger"}`}
                        onClick={() => setIsLost(true)}
                    >
                        PERDIDO DEFAULT
                    </button>
                    <button
                        className={`btn ${isLost ? "btn-danger" : "btn-success"}`}
                        onClick={() => setIsLost(false)}
                    >
                        ENCONTRADO
                    </button>
                </div>

                <form className="w-100" style={{ maxWidth: 420 }}>
                    {isLost ? (
                        <div className="mb-3">
                            <label className="form-label">Lugar donde se perdió</label>
                            <div className="input-group">
                                <input
                                    required
                                    className="form-control"
                                    placeholder="LUGAR DONDE SE VIO POR ÚLTIMA VEZ"
                                    value={foundLocation}
                                    onChange={(e) => setFoundLocation(e.target.value)}
                                />
                                <LocationPicker onDone={setFoundLocation} />
                            </div>
                        </div>
                    ) : (
                        <div className="mb-3">
                            <label className="form-label">Lugar donde se encontró</label>
                            <div className="input-group">
                                <input
                                    required
                                    className="form-control"
                                    placeholder="LUGAR DONDE SE ENCONTRÓ"
                                    value={actualLocation}
                                    onChange={(e) => setActualLocation(e.target.value)}
                                />
                                <LocationPicker onDone={setActualLocation} />
                            </div>
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            className="form-control"
                            placeholder="NOMBRE"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="p-4">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setOpen((v) => !v)}
                            aria-expanded={open}
                            aria-controls="optionForm"
                        >
                            {open ? "Hide options" : "Show options"}
                        </button>

                        <div
                            id="optionForm"
                            onChange={buildString}
                            className={`collapse ${open ? "show" : ""} mt-3`}
                        >
                            {/*  all your existing option markup  */}
                            <div className="mb-3">
                                <label className="form-label">Especie</label>
                                <select
                                    onChange={(e) => setBreed(e.target.value)}
                                    name="especie"
                                    className="form-select"
                                    required
                                >
                                    <option value="" disabled hidden>
                                        Seleccione una especie
                                    </option>
                                    <option value="" disabled selected hidden>Seleccione una especie</option>
                                    <option>Perro</option>
                                    <option>Gato</option>
                                    <option>Ave</option>
                                    <option>Conejo</option>
                                    <option>Otro</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Tamaño</label>
                                <select name="tamano" className="form-select" required>
                                    <option value="" disabled selected hidden>Seleccione tamaño</option>
                                    <option>Pequeño</option>
                                    <option>Mediano</option>
                                    <option>Grande</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Tipo de pelo / plumaje</label>
                                <select name="pelo" className="form-select" required>
                                    <option value="" disabled selected hidden>Seleccione tipo de pelo</option>
                                    <option>Corto</option>
                                    <option>Mediano</option>
                                    <option>Largo</option>
                                    <option>Rizado</option>
                                    <option>No aplica</option>
                                    <option>No lo sé</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Color del pelaje</label>
                                {[
                                    "Negro",
                                    "Blanco",
                                    "Marrón",
                                    "Crema",
                                    "Gris",
                                    "Dorado",
                                    "Amarillo",
                                    "Atigrado",
                                ].map((c) => (
                                    <div key={c} className="form-check">
                                        <input
                                            name="color"
                                            className="form-check-input"
                                            type="checkbox"
                                            value={c}
                                            id={`color${c}`}
                                        />
                                        <label className="form-check-label" htmlFor={`color${c}`}>
                                            {c}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Marcas distintivas (opcional)</label>
                                {[
                                    "Collar",
                                    "Arnés",
                                    "Oreja dañada",
                                    "Cola corta",
                                    "Ojos distintos",
                                    "Cicatriz",
                                    "Ninguna",
                                ].map((m) => (
                                    <div key={m} className="form-check">
                                        <input
                                            name="marca"
                                            className="form-check-input"
                                            type="checkbox"
                                            value={m}
                                            id={`marca${m}`}
                                        />
                                        <label className="form-check-label" htmlFor={`marca${m}`}>
                                            {m}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <label className="form-label">
                        {isLost
                            ? "Día y hora aproximada en que se perdió"
                            : "Día y hora aproximada en que se encontró"}
                    </label>
                    <input
                        className="form-control"
                        type="datetime-local"
                        value={foundTime}
                        onChange={(e) => setFoundTime(e.target.value)}
                    />

                    <div className="mb-3 d-flex justify-content-end">
                        <button
                            type="button"
                            className="btn btn-success px-4 py-2"
                            onClick={() => sendNewPetPost(formData)}
                        >
                            REGISTRAR
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};