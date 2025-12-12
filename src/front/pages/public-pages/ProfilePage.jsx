import { useState, useEffect } from "react";
import { getUserById, updateUser, deleteUser } from "../../services/userServices";
import { getAuthentication } from "../../services/loginServices";
import { useNavigate } from "react-router-dom";
import perrito from "../../assets/img/DobbyElElfo.JPG";
import useGlobalReducer from "../../hooks/useGlobalReducer";

export const ProfilePage = () => {
    const { switchLogin } = useGlobalReducer();
    const navigate = useNavigate();

    // estados locales para guardar la url de la imagen y guardar valor inicial false
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false)


    // Imagenes Cloudinary
    const preset_name = 'perfil_preset';
    const cloud_name = 'dlwvnnmhp';


    // constante para subir imagenes a cloudinary
    const uploadImage = async (e) => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', preset_name)
        setLoading(true)

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });

            const file = await response.json();
            setImage(file.secure_url);
            setFormData({
                ...formData,
                prof_img: file.secure_url
            });
            setLoading(false);

        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }

    }

    const [user, setUser] = useState(null);
    const [isChange, setIsChange] = useState(false);
    const [formData, setFormData] = useState({});

    const authenticationPrivateZone = async () => {
        const response = await getAuthentication();
        if (!response.done) {
            navigate("/");
        }
    }

    useEffect(() => {
        authenticationPrivateZone();
    }, []);

    useEffect(() => {
        const storedId = localStorage.getItem("userId");
        if (!storedId) return;

        const loadProfile = async () => {
            try {
                const data = await getUserById(storedId);
                setUser(data);
                setFormData(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //
    const handleSaveChanges = async () => {
        try {
            // Llamamos al servicio updateUser en userServices.js
            await updateUser(user.id, formData);

            setUser(formData);
            setIsChange(false);
            alert("Perfil actualizado correctamente");

        } catch (error) {
            console.error(error);
            alert("Error al actualizar el perfil: " + error.message);
        }
    };

    //
    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que quieres eliminar tu cuenta?"
        );
        if (!confirmDelete) return;

        try {
            // Llamamos al servicio deleteUser en userServices.js
            await deleteUser(user.id);

            localStorage.clear();
            switchLogin();
            alert("Cuenta eliminada correctamente.");
            navigate("/");

        } catch (error) {
            console.error(error);
            alert("Hubo un error al eliminar la cuenta: " + error.message);
        }
    }

    if (!user) return <p>Cargando...</p>;

    return (
        <div className="m-5 d-flex justify-content-center">
            <div className="card shadow-lg p-4" style={{ width: "28rem", borderRadius: "15px" }}>
                <div className="text-center mb-3">
                    {loading ? (<img
                        src={user.prof_img || "aa"}
                        alt="Foto perfil cargada"
                        className="rounded-circle"
                        width="130"
                        height="130"
                        style={{ objectFit: "cover" }}
                    />) : (<img
                        src={user.prof_img || image}
                        alt="Foto perfil sin cargar"
                        className="rounded-circle"
                        width="130"
                        height="130"
                        style={{ objectFit: "cover" }}
                    />)}
                </div>

                {/* --- SECCIÓN DE FORMULARIO / VISTA --- */}
                {isChange ? (
                    <div className="d-flex flex-column gap-2">

                        <input
                            type="file"
                            name="imageProfile"
                            placeholder="Cambiar imagen"
                            accept="image/*"
                            onChange={(e) => uploadImage(e)}
                        />
                        <input
                            type="text"
                            className="form-control text-center mb-2"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleInputChange}
                            placeholder="Nombre"
                        />
                        <input
                            type="text"
                            className="form-control text-center mb-2"
                            name="last_name"
                            value={formData.last_name || ""}
                            onChange={handleInputChange}
                            placeholder="Apellido"
                        />
                        <input
                            type="text"
                            className="form-control text-center text-muted mb-3"
                            name="username"
                            value={formData.username || ""}
                            onChange={handleInputChange}
                            placeholder="Username"
                        />
                    </div>
                ) : (
                    <>
                        <h2 className="text-center">{user.name} {user.last_name}</h2>
                        <p className="text-center text-muted">@{user.username}</p>
                    </>
                )}

                <div className="mb-3">
                    <strong>Email:</strong>
                    <p>{user.email}</p>
                </div>

                <div className="mb-3">
                    <strong>Dirección:</strong>
                    {isChange ? (
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={formData.address || ""}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <p>{user.address || "No especificada"}</p>
                    )}
                </div>

                <div className="mb-3">
                    <strong>Teléfono:</strong>
                    {isChange ? (
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={formData.phone || ""}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <p>{user.phone || "No indicado"}</p>
                    )}
                </div>

                <div className="text-center mt-4 d-flex flex-column gap-2">
                    {isChange ? (
                        <div className="d-flex gap-2 justify-content-center">
                            <button
                                className="btn btn-success px-4"
                                onClick={handleSaveChanges}
                            >
                                Guardar
                            </button>
                            <button
                                className="btn btn-secondary px-4"
                                onClick={() => {
                                    setIsChange(false);
                                    setFormData(user);
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    ) : (
                        <button
                            className="btn btn-primary px-4"
                            onClick={() => setIsChange(true)}
                        >
                            Editar Perfil
                        </button>
                    )}

                    {!isChange && (
                        <button
                            className="btn btn-danger px-4"
                            onClick={handleDeleteAccount}
                        >
                            Darse de baja
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

