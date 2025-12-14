import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPetPost } from "../../services/petPostServices";
import { useNavigate } from "react-router-dom"
import { getAuthentication } from "../../services/loginServices";
import { uploadToCloudinary } from "../../services/ImagesServices"; 

export const RegisterPets = () => {

    const [open, setOpen] = useState(false);
    const [summary, setSummary] = useState('');

    const [foundLocation, setFoundLocation] = useState("");
    const [actualLocation, setActualLocation] = useState("");
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [physicalDescription, setPhysicalDescription] = useState("");
    const [foundTime, setFoundTime] = useState("")
    const [isLost, setIsLost] = useState(false)

    // --- 2. ESTADOS PARA IMÁGENES ---
    const [imageUrls, setImageUrls] = useState([]);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState(
        { found_location: "", actual_location: "", found_time: "", name: "", breed: "", physical_description: "", is_lost: "", images: [] })

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
        if (response) {
            alert("Mascota registrada correctamente");
        }
    }

    const buildString = () => {
        const f = document.getElementById('optionForm');
        const txt = (sel) => (f.querySelector(sel)?.value || '').trim();
        const arr = (name) => [...f.querySelectorAll(name)].filter(c => c.checked).map(c => c.value).join(';');

        setSummary(
            ['Tamano:' + txt('[name="tamano"]'),
            'Pelo:' + txt('[name="pelo"]'),
            'Color:' + arr('input[name="color"]:checked'),
            'Marcas:' + arr('input[name="marca"]:checked')]
                .filter(Boolean).join('|')
        );
    };

    return (
        <div className="container d-flex flex-column align-items-center py-5 min-vh-100">
            <div className="card shadow-lg rounded-4 p-4 w-100" style={{ maxWidth: 480 }}>
                <h1 className="text-center mb-4 fw-semibold">Crear registro</h1>
                <div className="my-3">
                    <button className={`btn ${isLost ? "btn-success" : "btn-danger"}`} onClick={() => setIsLost(true)}>PERDIDO DEFAULT</button>
                    <button className={`btn ${isLost ? "btn-danger" : "btn-success"}`} onClick={() => setIsLost(false)}>ENCONTRADO</button>
                </div>
                <form
                    //onSubmit={}
                    className="w-100"
                    style={{ maxWidth: "420px" }}
                >
                    {isLost ? <div className="mb-3">
                        <label className="form-label">Lugar donde se perdió</label>
                        <input
                            required
                            className="form-control"
                            type="lugar"
                            placeholder="LUGAR DONDE SE VIO POR ÚLTIMA VEZ"
                            onChange={({ target }) => setFoundLocation(target.value)}
                            value={foundLocation}
                        />
                    </div> :
                        <div className="mb-3">
                            <label className="form-label">Lugar donde se encontró</label>
                            <input
                                required
                                className="form-control"
                                placeholder="LUGAR DONDE SE ENCONTRÓ"
                                onChange={({ target }) => setActualLocation(target.value)}
                                value={actualLocation}
                            />
                        </div>
                    }
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            className="form-control"
                            placeholder="NOMBRE"
                            onChange={({ target }) => setName(target.value)}
                            value={name}
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
                            {open ? 'Hide options' : 'Show options'}
                        </button>

                        <div
                            id="optionForm"
                            onChange={() => buildString()}
                            className={`collapse ${open ? 'show' : ''} mt-3`}
                        >
                            <div className="mb-3">
                                <label className="form-label">Especie</label>
                                <select onChange={e => setBreed(e.target.value)} name="especie" className="form-select" required>
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
                                    <option value="" disabled selected hidden>Seleccione un tamaño</option>
                                    <option>Pequeño</option>
                                    <option>Mediano</option>
                                    <option>Grande</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tipo de pelo / plumaje</label>
                                <select name="pelo" className="form-select" required>
                                    <option value="" disabled selected hidden>Seleccione un tipo de pelaje</option>
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
                                <div className="form-check">
                                    <input name="color" className="form-check-input" type="checkbox" value="Negro" id="colorNegro" />
                                    <label className="form-check-label" htmlFor="colorNegro">Negro</label>
                                </div>
                                <div className="form-check">
                                    <input name="color" className="form-check-input" type="checkbox" value="Blanco" id="colorBlanco" />
                                    <label className="form-check-label" htmlFor="colorBlanco">Blanco</label>
                                </div>
                                <div className="form-check">
                                    <input name="color" className="form-check-input" type="checkbox" value="Marrón" id="colorMarron" />
                                    <label className="form-check-label" htmlFor="colorMarron">Marrón</label>
                                </div>
                                <div className="form-check">
                                    <input name="color" className="form-check-input" type="checkbox" value="Crema" id="colorBeige" />
                                    <label className="form-check-label" htmlFor="colorBeige">Crema</label>
                                </div>
                                <div className="form-check">
                                    <input name="color" className="form-check-input" type="checkbox" value="Gris" id="colorGris" />
                                    <label className="form-check-label" htmlFor="colorGris">Gris</label>
                                </div>
                                <div className="form-check">
                                    <input name="color" className="form-check-input" type="checkbox" value="Dorado" id="colorBicolor" />
                                    <label className="form-check-label" htmlFor="colorBicolor">Dorado</label>
                                </div>
                                <div className="form-check">
                                    <input name="color" className="form-check-input" type="checkbox" value="Amarillo" id="colorTricolor" />
                                    <label className="form-check-label" htmlFor="colorTricolor">Amarillo</label>
                                </div>
                                <div className="form-check">
                                    <input name="color" className="form-check-input" type="checkbox" value="Atigrado" id="colorAtigrado" />
                                    <label className="form-check-label" htmlFor="colorAtigrado">Atigrado</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Marcas distintivas (opcional)</label>
                                <div className="form-check">
                                    <input name="marca" className="form-check-input" type="checkbox" value="Collar" id="marcaCollar" />
                                    <label className="form-check-label" htmlFor="marcaCollar">Collar</label>
                                </div>
                                <div className="form-check">
                                    <input name="marca" className="form-check-input" type="checkbox" value="Arnés" id="marcaArnes" />
                                    <label className="form-check-label" htmlFor="marcaArnes">Arnés</label>
                                </div>
                                <div className="form-check">
                                    <input name="marca" className="form-check-input" type="checkbox" value="Oreja dañada" id="marcaOreja" />
                                    <label className="form-check-label" htmlFor="marcaOreja">Oreja dañada o caída</label>
                                </div>
                                <div className="form-check">
                                    <input name="marca" className="form-check-input" type="checkbox" value="Cola corta" id="marcaCola" />
                                    <label className="form-check-label" htmlFor="marcaCola">Cola corta</label>
                                </div>
                                <div className="form-check">
                                    <input name="marca" className="form-check-input" type="checkbox" value="Ojos distintos" id="marcaOjos" />
                                    <label className="form-check-label" htmlFor="marcaOjos">Ojos de distinto color</label>
                                </div>
                                <div className="form-check">
                                    <input name="marca" className="form-check-input" type="checkbox" value="Cicatriz" id="marcaCicatriz" />
                                    <label className="form-check-label" htmlFor="marcaCicatriz">Cicatriz visible</label>
                                </div>
                                <div className="form-check">
                                    <input name="marca" className="form-check-input" type="checkbox" value="Ninguna" id="marcaNinguna" />
                                    <label className="form-check-label" htmlFor="marcaNinguna">Ninguna / No lo sé</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isLost ? <label className="form-label">Día y hora aproximada en que se perdió</label> :
                        <label className="form-label">Día y hora aproximada en que se encontró</label>
                    }
                    <input
                        className="form-control"
                        placeholder="HORA DE ENCUENTRO"
                        type="datetime-local"
                        onChange={({ target }) => setFoundTime(target.value)}
                        value={foundTime}
                    />


                    <div className="mb-3 mt-3">
                        <label className="form-label fw-bold">Fotos de la mascota</label>
                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            multiple 
                            onChange={handleImageUpload}
                            disabled={uploading}
                        />
                        {uploading && <div className="text-warning mt-2">Subiendo imágenes...</div>}

                        {/* Vista previa de imágenes */}
                        <div className="d-flex flex-wrap gap-2 mt-2">
                            {imageUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`preview-${index}`}
                                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mb-3 mt-3 d-flex justify-content-end">
                        <button
                            onClick={() => sendNewPetPost(formData)}
                            type="button"
                            className="boton btn btn-success px-4 py-2"
                            disabled={uploading} // Desactivar si se está subiendo
                        >
                            {uploading ? "CARGANDO..." : "REGISTRAR"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}