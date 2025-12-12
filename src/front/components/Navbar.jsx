import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/img/Logo.png";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { login, switchLogin } = useGlobalReducer();
	const navigate = useNavigate();
	
	const handleLogout = () => {
		localStorage.clear()
		switchLogin();
		navigate("/");

	};

	return (
		<nav className="navbar navbar-expand-lg text-light color-text-light">
			<div className="container-fluid text-light">

				<Link to="/" className="navbar-brand mx-5">
					<img className="logo" src={Logo} alt="Logo Inanna" />
				</Link>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">

					<ul className="navbar-nav me-auto">
						<li className="nav-item mx-3">
							<Link to="/refuges" className="nav-link text-light">
								<b>Refugios</b>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/foundlostanimals" className="nav-link text-light">
								<b>Animales Perdidos/Encontrados</b>
							</Link>
						</li>
					</ul>

					<input
						className="form-control bi bi-camera w-25"
						type="search"
						placeholder="Búsqueda avanzada"
						aria-label="Search"
					/>

					<div>
						<Link to="/filteredsearch">
							<button className="btn btn-outline-success mx-1" type="submit">
								<i className="fa-solid fa-magnifying-glass"></i>
							</button>
						</Link>
					</div>

					{login ? (

						//     VISTA SI ESTÁ LOGUEADO
						<div className="nav-item mx-3 d-flex align-items-center">
							<Link to="/ProfilePage" className="nav-link me-3">
								<i className="fa-regular fa-user me-1"></i>Mi Perfil
							</Link>

							<button
								className="btn btn-danger"
								onClick={handleLogout}
							>
								Logout
							</button>
						</div>
					) : (
						//   VISTA SI NO ESTÁ LOGUEADO
						<div className="nav-item mx-3 d-flex">
							<Link to="/signup-page" className="nav-link me-3">
								<i className="fa-solid fa-pen-to-square me-1"></i>Registro
							</Link>
							<Link to="/loginpage" className="nav-link">
								<i className="fa-regular fa-user me-1"></i>Login
							</Link>
						</div>
					)}

				</div>
			</div>
		</nav>
	);
};
