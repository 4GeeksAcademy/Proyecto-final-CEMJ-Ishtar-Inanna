import React, { useEffect, useState } from "react";
import { getUserById } from "../../services/userServices";

export const ProfilePage = () => {
    const [user, setUser] = useState(null);

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

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-lg p-4" style={{ width: "28rem", borderRadius: "15px" }}>

                {/* Imagen del usuario */}
                <div className="text-center mb-3">
                    <img
                        src={user.prof_img || "/img/DobbyElElfo.JPG"}
                        alt="Foto perfil"
                        className="rounded-circle"
                        width="130"
                        height="130"
                        style={{ objectFit: "cover" }}
                    />
                </div>

                <h3 className="text-center">{user.name} {user.last_name}</h3>
                <p className="text-center text-muted">@{user.username}</p>

                <hr />

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

                <div className="text-center mt-4">
                    <button className="btn btn-primary px-4">
                        Editar Perfil
                    </button>
                </div>

            </div>
        </div>
    );
};
