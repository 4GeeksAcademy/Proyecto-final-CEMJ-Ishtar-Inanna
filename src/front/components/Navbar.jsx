import { Link } from "react-router-dom";

import Logo from "../assets/img/Logo.png";



export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg text-light">
			<div className="container-fluid text-light">
				<a className="navbar-brand mx-5" href="#">
					{/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> */}
					<img className="logo" src={Logo} alt="Logo Inanna"></img></a>
				{/* </button> */}
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto">
						<li className="nav-item mx-4">
							<a className="nav-link text-light" href="#"><b>Refugios</b></a>
						</li>
						<li className="nav-item">
							<a className="nav-link text-light" href="#"><b>Animales</b></a>
						</li>

					</ul>
					<form className="d-flex" role="search">
						<input className="form-control" type="search" placeholder="Búsqueda avanzada" aria-label="Search" />
						<div>
							<Link to="/filteredsearch">
								<button className="btn btn-outline-success mx-1" type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
							</Link>
							<i class="bi bi-camera"></i>
						</div>

					</form>
					<div className="nav-item mx-3 d-flex">
						<a className="nav-link me-3" href="#"><i className="fa-solid fa-pen-to-square me-1"></i>Registro</a>

						<a className="nav-link" href="#"><i className="fa-regular fa-user me-1"></i>Login</a>
					</div>
					
				</div>
			</div>
		</nav>
	);
};



