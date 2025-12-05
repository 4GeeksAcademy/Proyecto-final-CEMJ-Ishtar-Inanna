import { Link } from "react-router-dom";

import Logo from "../assets/img/Logo.png";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Navbar = () => {



	const { login, switchLogin } = useGlobalReducer()
	console.log(useGlobalReducer())

	const handleLogout = () => {
		localStorage.clear()
		switchLogin()
	}

	return (
		<nav className="navbar navbar-expand-lg text-light color-text-light">
			<div className="container-fluid text-light">
				<Link to="/" className="navbar-brand mx-5">

					{/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> */}
					<img className="logo" src={Logo} alt="Logo Inanna"></img>

				</Link>
				{/* </button> */}
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto">
						<li className="nav-item mx-3">
							<Link to="/Refuges" className="nav-link text-light">
								<b>Refugios</b>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/foundlostanimals" className="nav-link text-light"><b>Animales Perdidos/Encontrados</b></Link>
						</li>

					</ul>

					<input className="form-control bi bi-camera" type="search" placeholder="Búsqueda avanzada" aria-label="Search" />

					<div>
						<Link to="/filteredsearch">
							<button className="btn btn-outline-success mx-1" type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
						</Link>

					</div>
					{login && <div><button onClick={handleLogout}>Logout</button></div>}

					<div className="nav-item mx-3 d-flex">
						<Link to="/signup-page" className="nav-link me-3">
							<i className="fa-solid fa-pen-to-square me-1"></i>Registro
						</Link>
						<Link to="/loginpage" className="nav-link" >
							<i className="fa-regular fa-user me-1"></i>Login
						</Link>
					</div>

				</div>
			</div>

			<button onClick={() => console.log("el valor de login es ", login)}>TesteoLogin</button>
		</nav>
	);
};



