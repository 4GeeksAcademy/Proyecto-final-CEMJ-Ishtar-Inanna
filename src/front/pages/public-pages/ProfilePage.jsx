import React, { useEffect, useState } from "react";

export const ProfilePage = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedId = localStorage.getItem("userId");
        if (storedId) setUserId(storedId);
    }, []);

    if (!userId) return <p>Cargando...</p>;

    return (
        <div className="container mt-5">
            <h1>Perfil (ejemplo)</h1>
            <p><strong>User ID:</strong> {userId}</p>
            <p><strong>Nombre:</strong> Temporal</p>
            <p><strong>Email:</strong> Temporal</p>
        </div>
    );
};
