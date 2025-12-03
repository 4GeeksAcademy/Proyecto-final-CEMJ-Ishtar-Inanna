import React, { useEffect, useState } from "react";
import { getMyTasks, login } from "../services/loginServices.js";

export const LoginPage = () => {

	const [password, setPassword] = useState("");
	const [userName, setUserName] = useState("");
	const token = localStorage.getItem("jwt-token");

	useEffect(() => { }, [token]);

	const handleLogin = (e) => {
		e.preventDefault();
		login(userName, password);
	};

	return (
		<div className="container d-flex flex-column align-items-center mt-5">

			<h1 className="mb-4">Iniciar sesión</h1>

			<form
				onSubmit={handleLogin}
				className="w-100"
				style={{ maxWidth: "420px" }}
			>

				<div className="mb-3">
					<label className="form-label">Usuario</label>
					<input
						className="form-control"
						placeholder="Introduce tu usuario"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>

				<div className="mb-4">
					<label className="form-label">Contraseña</label>
					<input
						className="form-control"
						type="password"
						placeholder="Introduce tu contraseña"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className="d-flex justify-content-end mb-3">
					<button type="submit" className="btn btn-success px-4 py-2">
						entrar
					</button>
				</div>
			</form>

			<div className="w-100" style={{ maxWidth: "420px" }}>
				<button
					className="btn btn-primary w-100 mb-2"
					onClick={getMyTasks}
				>
					Testear sistema de login
				</button>

				<button className="btn btn-danger w-100">
					Logout
				</button>

				<p className="mt-3 text-center">
					{token ? "You are logged in" : "You are not logged in"}
				</p>
			</div>
		</div>
	);
};
