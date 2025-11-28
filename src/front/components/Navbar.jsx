import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">Logo</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a className="nav-link" href="#">Refugios</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Animales</a>
						</li>
					
					</ul>
					<form className="d-flex" role="search">
						<input className="form-control me-2" type="search" placeholder="Búsqueda avanzada" aria-label="Search" />
						<button className="btn btn-outline-success" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
					</form>
					<div className="nav-item mx-3 d-flex">
							<a className="nav-link me-3" href="#"><i class="fa-solid fa-pen-to-square me-1"></i>Registro</a>
					
							<a className="nav-link" href="#"><i class="fa-regular fa-user me-1"></i>Login</a>
					</div>
				</div>
			</div>
		</nav>
	);
};

