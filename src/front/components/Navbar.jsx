import { Link } from "react-router-dom";

import Logo from "../assets/img/Logo.png";



export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg text-light color-text-light">
			<div className="container-fluid text-light">
				<a className="navbar-brand mx-5" href="#">
					{/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> */}
					<img className="logo" src={Logo} alt="Logo Inanna"></img></a>
				{/* </button> */}
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto">
						<li className="nav-item mx-3">
							<Link to="/Refuges"><a className="nav-link text-light"><b>Refugios
							</b></a></Link>
						</li>
						<li className="nav-item">
							<Link to="/foundlostanimals"><a className="nav-link text-light" href="#"><b>Animales Perdidos/Encontrados</b></a></Link>
						</li>

					</ul>
					<form className="d-flex" role="search">

						<input className="form-control bi bi-camera" type="search" placeholder="Búsqueda avanzada" aria-label="Search" />

						<div>
							<Link to="/filteredsearch">
								<button className="btn btn-outline-success mx-1" type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
							</Link>

						</div>

					</form>
					<div>
						<Link to="/loginpage">
							<button className="btn btn-primary">Vamos a login</button>
						</Link>
						<Link to="/registerpage">
							<button className="btn btn-primary">Vamos a register</button>
						</Link>

					</div>

				</div>
			</div>
		</nav>
	);
};



