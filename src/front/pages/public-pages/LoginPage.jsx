import React, { useEffect, useState } from "react"
import { getAuthentication, login } from "../../services/loginServices.js"
import { useActionState } from "react"

export const LoginPage = () => {

	const [password, setPassword] = useState("")
	const [userName, setUserName] = useState("")
	const token = localStorage.getItem("jwt-token")


	return (
		<>
			<div className="container">
				<h3>Login test</h3>
				<div>
					<input placeholder="Username" value={userName} onChange={e => setUserName(e.target.value)}></input>
					<input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
					<button onClick={e => login(userName, password)}>Login</button>
				</div>
				<div>
					<button onClick={e => getAuthentication()}>Testeame el sistema de logeo</button>
				</div>
				<div>
					<button>Logout</button>
				</div>
				{(token ? "You are logged in" : "You are not logged in")}
			</div>

		</>
	)
}