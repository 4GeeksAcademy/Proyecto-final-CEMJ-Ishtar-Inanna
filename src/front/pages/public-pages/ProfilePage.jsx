import { useState, useEffect } from "react";
import { getUserById } from "../../services/userServices";
import { getAuthentication } from "../../services/loginServices";
import { useNavigate } from "react-router-dom";
import perrito from "../../assets/img/DobbyElElfo.JPG";
export const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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
            } catch (error) {
                console.error(error);
            }
        };

        loadProfile();
    }, []);

    if (!user) return <p>Cargando...</p>;

    // Función para eliminar cuenta y confirmación por missclick
    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que quieres eliminar tu cuenta?"
        );
        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://zany-umbrella-g6p44xrqpqjcvxpw-3001.app.github.dev/api/users/${user.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                // Limpiar datos del usuario
                localStorage.removeItem("userId");
                alert("Cuenta eliminada correctamente.");
                navigate("/");
            } else {
                const data = await response.json();
                alert(`Error al eliminar la cuenta: ${data.Message || "Intenta de nuevo"}`);
            }
        } catch (error) {
            console.error(error);
            alert("Hubo un error al intentar eliminar la cuenta.");
        }
    }

    return (
        <div className=" m-5 d-flex justify-content-center">
            <div className="card shadow-lg p-4" style={{ width: "28rem", borderRadius: "15px" }}>
                <div className="text-center mb-3">
                    <img
                        src={user.prof_img || perrito}
                        alt="Foto perfil"
                        className="rounded-circle"
                        width="130"
                        height="130"
                        style={{ objectFit: "cover" }}
                    />
                </div>

                <h2 className="text-center">{user.name} {user.last_name}</h2>
                <p className="text-center text-muted">@{user.username}</p>

                <div className="mb-3">
                    <strong>Email:</strong>
                    <p>{user.email}</p>
                </div>

                <div className="mb-3">
                    <strong>Dirección:</strong>
                    <p>{user.address || "No especificada"}</p>
                </div>

                <div className="mb-3">
                    <strong>Teléfono:</strong>
                    <p>{user.phone || "No indicado"}</p>
                </div>

                <div className="text-center mt-4 d-flex flex-column gap-2">
                    <button className="btn btn-primary px-4">
                        Editar Perfil
                    </button>
                    <button
                        className="btn btn-danger px-4"
                        onClick={handleDeleteAccount}
                    >
                        Darse de baja
                    </button>
                </div>
            </div>
        </div>
    );
};
