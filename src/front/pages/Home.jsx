import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { login } from "../services/loginServices.js";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	const[password,setPassword]= useState("")
	const[userName,setUserName]= useState("")

	useEffect(() => {
		loadMessage()
	}, [])

	console.log(userName)
	console.log(password)

	return (
		<div className="text-center mt-5">
			<h3>Login and register test</h3>
			
			<div>
				<input placeholder="Username" onChange={e=>setUserName(e.target.value)}></input>
				<input placeholder="Password" onChange={e=>setPassword(e.target.value)}></input>
				<button >Register</button>
			</div>
			<div>
				<input placeholder="Username" onChange={e=>setUserName(e.target.value)}></input>
				<input placeholder="Password" onChange={e=>setPassword(e.target.value)}></input>
				<button onClick={e=>login(userName,password)}>Login</button>
			</div>
			<p className="lead">
				<img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
			</p>
			<div className="alert alert-info">
				{store.message ? (
					<span>{store.message}</span>
				) : (
					<span className="text-danger">
						Loading message from the backend (make sure your python 🐍 backend is running)...
					</span>
				)}
			</div>
		</div>
	);
}; 