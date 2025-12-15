import { useState, useEffect } from "react";
import { createPetPost } from "../../services/petPostServices";
import GoogleMapWidget from "../../components/Map";
import { uploadToCloudinary } from "../../services/ImagesServices";

const LocationPicker = ({ onDone }) => {
  const [show, setShow] = useState(false);
  const [picked, setPicked] = useState(null);

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
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,.45)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Selecciona una ubicación</h5>
                <button className="btn-close" onClick={() => setShow(false)} />
              </div>

              <div className="modal-body p-0">
                <GoogleMapWidget onPick={(lat, lng) => setPicked({ lat, lng })} />
                {picked && (
                  <div className="p-2 small text-muted">
                    Lat: {picked.lat.toFixed(6)} · Lng: {picked.lng.toFixed(6)}
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShow(false)}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={confirm} disabled={!picked}>
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

  /* ---- imágenes ---- */
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({});

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
      images: imageUrls,
    });
  }, [
    foundLocation,
    actualLocation,
    foundTime,
    name,
    breed,
    summary,
    isLost,
    imageUrls,
  ]);

  useEffect(() => {
    setFoundLocation("");
    setActualLocation("");
  }, [isLost]);

  const sendNewPetPost = async () => {
    await createPetPost(formData);
    alert("Mascota registrada correctamente");
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadToCloudinary));
      setImageUrls((prev) => [...prev, ...urls]);
    } catch (err) {
      console.error("Error subiendo imágenes", err);
    } finally {
      setUploading(false);
    }
  };

  const buildString = () => {
    const f = document.getElementById("optionForm");
    const txt = (sel) => f.querySelector(sel)?.value || "";
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
      ].join("|")
    );
  };

  return (
    <div className="container d-flex justify-content-center py-5">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: 480 }}>
        <h1 className="text-center mb-4">Crear registro</h1>

        <div className="d-flex gap-2 mb-3">
          <button
            className={`btn ${isLost ? "btn-success" : "btn-danger"}`}
            onClick={() => setIsLost(true)}
          >
            PERDIDO
          </button>
          <button
            className={`btn ${!isLost ? "btn-success" : "btn-danger"}`}
            onClick={() => setIsLost(false)}
          >
            ENCONTRADO
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">
            {isLost ? "Lugar donde se perdió" : "Lugar donde se encontró"}
          </label>
          <div className="input-group">
            <input
              className="form-control"
              value={isLost ? foundLocation : actualLocation}
              onChange={(e) =>
                isLost
                  ? setFoundLocation(e.target.value)
                  : setActualLocation(e.target.value)
              }
            />
            <LocationPicker onDone={isLost ? setFoundLocation : setActualLocation} />
          </div>
        </div>

        <input
          className="form-control mb-3"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="datetime-local"
          value={foundTime}
          onChange={(e) => setFoundTime(e.target.value)}
        />

        <button
          className="btn btn-outline-primary mb-3"
          onClick={() => setOpen(!open)}
        >
          {open ? "Ocultar opciones" : "Mostrar opciones"}
        </button>

        <div
          id="optionForm"
          className={`collapse ${open ? "show" : ""}`}
          onChange={buildString}
        >
          {/* opciones aquí */}
        </div>

        <input
          type="file"
          className="form-control mb-2"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
        />

        <div className="d-flex gap-2 flex-wrap mb-3">
          {imageUrls.map((url, i) => (
            <img key={i} src={url} alt="" width={60} height={60} />
          ))}
        </div>

        <button
          className="btn btn-success w-100"
          onClick={sendNewPetPost}
          disabled={uploading}
        >
          {uploading ? "Subiendo..." : "Registrar"}
        </button>
      </div>
    </div>
  );
};
