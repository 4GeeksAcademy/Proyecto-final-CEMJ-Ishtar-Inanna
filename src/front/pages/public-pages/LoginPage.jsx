import React, { useEffect, useState } from "react"
import { getAuthentication, login } from "../../services/loginServices.js"
import { useNavigate } from "react-router-dom"
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx"

export const LoginPage = () => {

	const [password, setPassword] = useState("")
	const [userName, setUserName] = useState("")
	const token = localStorage.getItem("jwt-token")

	const navigate = useNavigate()
	const { switchLogin } = useGlobalReducer()

	const authenticationPrivateZone = async () => {
		const response = await getAuthentication()

		if (response.done == true) {
			navigate('/')
			console.log(response)
		}
	}

	const handleLogin = async (userName, password) => {
		const response = await login(userName, password)
		if (response.token) {
			switchLogin()
			localStorage.setItem("userId", response.user_id);
			navigate("/profilepage");


		}


	}

	useEffect(() => {
		authenticationPrivateZone()
	}, [])

	return (
		<div className="container d-flex flex-column align-items-center mt-5">

			<h1 className="mb-4">Iniciar sesión</h1>

			<div
				className="w-100"
				style={{ maxWidth: "420px" }}
			>

				<div className="mb-3">
					<label className="form-label">Usuario</label>
					<input
						className="form-control"
						placeholder="Introduce tu usuario"
						value={userName}
						onChange={e => setUserName(e.target.value)}
					/>
				</div>

				<div className="mb-4">
					<label className="form-label">Contraseña</label>
					<input
						className="form-control"
						type="password"
						placeholder="Introduce tu contraseña"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>

				<div className="d-flex justify-content-end mb-3">
					<button
						className="button btn btn-success px-4 py-2"
						onClick={() => handleLogin(userName, password)}
					>
						Entrar
					</button>
				</div>
			</div>

			<div className="w-100" style={{ maxWidth: "420px" }}>
				<p className="mt-3 text-center">
					{token ? "You are logged in" : "You are not logged in"}
				</p>
			</div>
		</div>
	)
}
