import { useState, useEffect } from "react";
import { registerUser } from "../../services/registerUserServices";
import { useNavigate, Link } from "react-router-dom"
import { getAuthentication } from "../../services/loginServices";

export const SignUpPage = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const registerUsers = async (e) => {
        e.preventDefault();

        const userData = { username, email, password, name, last_name: lastName };
        try {
            const result = await registerUser(userData);
            console.log("Usuario registrado:", result);
            navigate('/loginpage')

        } catch (err) {
            console.error(err);
            alert("No se pudo registrar el usuario.");
        }
    }
    //PARA PRIVATIZAR PÁGINAS
    const navigate = useNavigate()

    const authenticationPrivateZone = async () => {
        const response = await getAuthentication()
        console.log(response)
        if (response.done == true) {
            navigate('/')
            console.log(response)
        }
    }
    useEffect(() => {
        authenticationPrivateZone()
    })

    return (
        <div className="container d-flex flex-column align-items-center mt-5">

            <h1 className="mb-4">Crear cuenta</h1>
            <form onSubmit={registerUsers}
                className="w-100"
                style={{ maxWidth: "420px" }}
            >

                <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input
                        className="form-control"
                        type="email"
                        placeholder="Introduce tu correo electrónico"
                        onChange={({ target }) => setEmail(target.value)}
                        value={email}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Usuario</label>
                    <input
                        className="form-control"
                        placeholder="Introduce tu usuario"
                        onChange={({ target }) => setUsername(target.value)}
                        value={username}
                    />
                </div>

                {/* Password */}
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Introduce tu contraseña"
                        onChange={({ target }) => setPassword(target.value)}
                        value={password}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        className="form-control"
                        placeholder="Introduce tu nombre"
                        onChange={({ target }) => setName(target.value)}
                        value={name}
                    />
                </div>

                {/* Last name */}
                <div className="mb-4">
                    <label className="form-label">Apellido</label>
                    <input
                        className="form-control"
                        placeholder="Introduce tu apellido"
                        onChange={({ target }) => setLastName(target.value)}
                        value={lastName}
                    />
                </div>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="button btn btn-success px-4 py-2">
                        siguiente
                    </button>
                </div>
            </form>
            <div className="text-center mt-4 pb-5">
                <p className="mb-0">
                    ¿Tienes una cuenta creada?{" "}
                    <Link
                        to="/loginpage"
                        className="text-success fw-bold text-decoration-none"
                    >
                        Iniciar sesión
                    </Link>
                </p>
            </div>
        </div>

    );
}
