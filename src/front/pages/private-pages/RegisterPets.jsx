
import { useState, useEffect } from "react";
import { createPetPost } from "../../services/petPostServices";
import { useNavigate } from "react-router-dom"
import { getAuthentication } from "../../services/loginServices";
import { uploadToCloudinary } from "../../services/ImagesServices";
import GoogleMapWidget from "../../components/Map";
import { useJsApiLoader } from "@react-google-maps/api";


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
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAJ36Mp6CXQ0u5bZpQuByVe1t5xZMam_bs",
    });

    const [open, setOpen] = useState(false);
    const [summary, setSummary] = useState("");

    const [foundLocation, setFoundLocation] = useState("");
    const [actualLocation, setActualLocation] = useState("");

    const [foundAddress, setFoundAddress] = useState("");
    const [actualAddress, setActualAddress] = useState("");

    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [physicalDescription, setPhysicalDescription] = useState("");
    const [foundTime, setFoundTime] = useState("")
    const [isLost, setIsLost] = useState(false)

    const [imageUrls, setImageUrls] = useState([]);
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate()

    const [formData, setFormData] = useState(
        { found_location: "", actual_location: "", found_time: "", name: "", breed: "", physical_description: "", is_lost: "", images: [] })

    const reverseGeocode = (coordsString, setTextFunc) => {
        if (isLoaded) {
            if (coordsString) {
                if (coordsString.includes(',')) {
                    const parts = coordsString.split(',');
                    const lat = parseFloat(parts[0]);
                    const lng = parseFloat(parts[1]);

                    if (!isNaN(lat)) {
                        if (!isNaN(lng)) {
                            const geocoder = new window.google.maps.Geocoder();
                            const latLngObj = { lat: lat, lng: lng };

                            geocoder.geocode({ location: latLngObj }, (results, status) => {
                                if (status === "OK") {
                                    if (results[0]) {
                                        setTextFunc(results[0].formatted_address);
                                    }
                                } else {
                                    console.log("No se pudo traducir la coordenada: " + status);
                                    setTextFunc("Dirección no encontrada");
                                }
                            });
                        }
                    }
                }
            }
        }
    };

    useEffect(() => {
        if (foundLocation) reverseGeocode(foundLocation, setFoundAddress);
        else setFoundAddress("");
    }, [foundLocation, isLoaded]);

    useEffect(() => {
        if (actualLocation) reverseGeocode(actualLocation, setActualAddress);
        else setActualAddress("");
    }, [actualLocation, isLoaded]);

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
            images: imageUrls
        })
    }, [foundLocation, actualLocation, foundTime, name, breed, summary, isLost, imageUrls])

    useEffect(() => { setActualLocation(""), setFoundLocation("") }, [isLost])

    const handleImageUpload = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const uploadPromises = Array.from(files).map(file => uploadToCloudinary(file));

        try {
            const urls = await Promise.all(uploadPromises);
            setImageUrls(prev => [...prev, ...urls]);
            setUploading(false);
        } catch (error) {
            console.error("Error subiendo imagenes", error);
            setUploading(false);
        }
    };

    const sendNewPetPost = async (formData) => {
        const response = await createPetPost(formData)
        navigate('/')
        
    }

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
                style={{
                    maxWidth: 480,
                    background: '#ffffff',
                    border: '1px solid #80cbc4',
                    boxShadow: '0 8px 30px rgba(0,105,92,.15)'
                }}>

                <h1 className="text-center mb-4 fw-semibold"
                    style={{ color: '#00695c', letterSpacing: '.5px' }}>
                    Crear registro
                </h1>

                <div className="my-3 d-flex gap-2 justify-content-center">
                    <button
                        className={`btn ${isLost ? 'btn-success' : 'btn-outline-danger'}`}
                        onClick={() => setIsLost(true)}
                        style={{
                            transition: '.25s ease',
                            boxShadow: isLost ? '0 4px 14px #28a74560' : 'none'
                        }}>
                        PERDIDO
                    </button>
                    <button
                        className={`btn ${isLost ? 'btn-outline-danger' : 'btn-success'}`}
                        onClick={() => setIsLost(false)}
                        style={{
                            transition: '.25s ease',
                            boxShadow: !isLost ? '0 4px 14px #28a74560' : 'none'
                        }}>
                        ENCONTRADO
                    </button>
                </div>

                {/* ----  FORM  ---- */}
                <form className="w-100" style={{ maxWidth: 420 }}>

                    {/* Location block (lost) */}
                    {isLost ? (
                        <div className="mb-3">
                            <label className="form-label fw-medium" style={{ color: '#00796b' }}>Lugar donde se perdió</label>
                            <div className="input-group shadow-sm rounded">
                                <input
                                    required
                                    className="form-control border-0"
                                    placeholder="LUGAR DONDE SE VIO POR ÚLTIMA VEZ"
                                    value={foundLocation}
                                    onChange={(e) => setFoundLocation(e.target.value)} />
                                <LocationPicker onDone={setFoundLocation} />
                            </div>
                            {foundAddress && <small className="text-muted fst-italic ms-1">{foundAddress}</small>}
                        </div>
                    ) : (
                        /* Location block (found) */
                        <div className="mb-3">
                            <label className="form-label fw-medium" style={{ color: '#00796b' }}>Lugar donde se encontró</label>
                            <div className="input-group shadow-sm rounded">
                                <input
                                    required
                                    className="form-control border-0"
                                    placeholder="LUGAR DONDE SE ENCONTRÓ"
                                    value={actualLocation}
                                    onChange={(e) => setActualLocation(e.target.value)} />
                                <LocationPicker onDone={setActualLocation} />
                            </div>
                            {actualAddress && <p className="text-muted fst-italic ms-1">{actualAddress}</p>}
                        </div>
                    )}

                    {/* Name */}
                    <div className="mb-3">
                        <label className="form-label fw-medium" style={{ color: '#00796b' }}>Nombre</label>
                        <input
                            className="form-control shadow-sm rounded border-0"
                            placeholder="NOMBRE"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>

                    {/* Collapsible options */}
                    <div className="p-4 rounded-3" style={{ background: '#e0f2f1' }}>
                        <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={() => setOpen((v) => !v)}
                            aria-expanded={open}
                            aria-controls="optionForm"
                            style={{ background: '#00695c', border: 'none' }}>
                            {open ? 'Ocultar opciones' : 'Mostrar opciones'}
                        </button>

                        <div
                            id="optionForm"
                            onChange={buildString}
                            className={`collapse ${open ? 'show' : ''} mt-3`}>

                            {/* Especie */}
                            <div className="mb-3">
                                <label className="form-label fw-medium" style={{ color: '#00796b' }}>Especie</label>
                                <select
                                    onChange={(e) => setBreed(e.target.value)}
                                    name="especie"
                                    className="form-select shadow-sm rounded border-0"
                                    required>
                                    <option value="" disabled selected hidden>Seleccione una especie</option>
                                    <option>Perro</option>
                                    <option>Gato</option>
                                    <option>Ave</option>
                                    <option>Conejo</option>
                                    <option>Otro</option>
                                </select>
                            </div>

                            {/* Tamaño */}
                            <div className="mb-3">
                                <label className="form-label fw-medium" style={{ color: '#00796b' }}>Tamaño</label>
                                <select name="tamano" className="form-select shadow-sm rounded border-0" required>
                                    <option value="" disabled selected hidden>Seleccione tamaño</option>
                                    <option>Pequeño</option>
                                    <option>Mediano</option>
                                    <option>Grande</option>
                                </select>
                            </div>

                            {/* Pelo / plumaje */}
                            <div className="mb-3">
                                <label className="form-label fw-medium" style={{ color: '#00796b' }}>Tipo de pelo / plumaje</label>
                                <select name="pelo" className="form-select shadow-sm rounded border-0" required>
                                    <option value="" disabled selected hidden>Seleccione tipo de pelo</option>
                                    <option>Corto</option>
                                    <option>Mediano</option>
                                    <option>Largo</option>
                                    <option>Rizado</option>
                                    <option>No aplica</option>
                                    <option>No lo sé</option>
                                </select>
                            </div>

                            {/* Colores */}
                            <div className="mb-3">
                                <label className="form-label fw-medium" style={{ color: '#00796b' }}>Color del pelaje</label>
                                {["Negro", "Blanco", "Marrón", "Crema", "Gris", "Dorado", "Amarillo", "Atigrado"].map((c) => (
                                    <div key={c} className="form-check">
                                        <input
                                            name="color"
                                            className="form-check-input"
                                            type="checkbox"
                                            value={c}
                                            id={`color${c}`} />
                                        <label className="form-check-label" htmlFor={`color${c}`}>{c}</label>
                                    </div>
                                ))}
                            </div>

                            {/* Marcas distintivas */}
                            <div className="mb-3">
                                <label className="form-label fw-medium" style={{ color: '#00796b' }}>Marcas distintivas (opcional)</label>
                                {["Collar", "Arnés", "Oreja dañada", "Cola corta", "Ojos distintos", "Cicatriz", "Ninguna"].map((m) => (
                                    <div key={m} className="form-check">
                                        <input
                                            name="marca"
                                            className="form-check-input"
                                            type="checkbox"
                                            value={m}
                                            id={`marca${m}`} />
                                        <label className="form-check-label" htmlFor={`marca${m}`}>{m}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Datetime */}
                    <label className="form-label fw-medium mt-3" style={{ color: '#00796b' }}>
                        {isLost ? "Día y hora aproximada en que se perdió" : "Día y hora aproximada en que se encontró"}
                    </label>
                    <input
                        className="form-control shadow-sm rounded border-0"
                        type="datetime-local"
                        value={foundTime}
                        onChange={(e) => setFoundTime(e.target.value)} />

                    {/* Images */}
                    <div className="mb-3 mt-3">
                        <label className="form-label fw-bold" style={{ color: '#00796b' }}>Fotos de la mascota</label>
                        <input
                            type="file"
                            className="form-control shadow-sm rounded border-0"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            disabled={uploading} />
                        {uploading && <div className="text-warning mt-2">Subiendo imágenes...</div>}

                        <div className="d-flex flex-wrap gap-2 mt-2">
                            {imageUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`preview-${index}`}
                                    style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid #80cbc4' }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mb-3 mt-3 d-flex justify-content-end">
                        <button
                            onClick={() => sendNewPetPost(formData)}
                            type="button"
                            className="boton btn btn-success px-4 py-2 shadow"
                            disabled={uploading}
                            style={{ background: '#d84315', border: 'none' }}>
                            {uploading ? "CARGANDO..." : "REGISTRAR"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};