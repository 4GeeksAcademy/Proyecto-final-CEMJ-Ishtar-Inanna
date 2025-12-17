import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPublicUser } from "../../services/userServices";

export const PublicProfilePage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const userId = state?.userId;

    useEffect(() => {
        if (!userId) {
            navigate("/");
            return;
        }

        getPublicUser(userId).then(setUser);
    }, [userId]);



    if (!user) return <p>Cargando perfil...</p>;

    return (
        <div className="container py-5 d-flex justify-content-center">
            <div className="card shadow p-4 text-center" style={{ width: "26rem" }}>

                <img
                    src={
                        user.prof_img ||
                        `https://ui-avatars.com/api/?name=${user.name}&length=1`
                    }
                    className="rounded-circle mx-auto mb-3"
                    width="120"
                    height="120"
                    style={{ objectFit: "cover" }}
                />

                <h3>{user.name} {user.last_name}</h3>
                <p className="text-muted">@{user.username}</p>
                <p> <strong>Número de teléfono:</strong> {user.phone}</p>

                <hr />

                {user.phone && (
                    <a
                        href={`https://wa.me/${user.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success w-100"
                    >
                        Contactar por WhatsApp
                    </a>
                )}
                {user.email && (
                    <a
                        href={`mailto:${user.email}?subject=Mascota encontrada`}
                        className="btn btn-primary w-100 mt-2"
                    >
                        Contactar por correo
                    </a>
                )}

            </div>

        </div>
    );
};
