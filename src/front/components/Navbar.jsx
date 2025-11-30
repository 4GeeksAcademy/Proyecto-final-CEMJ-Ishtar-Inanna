import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>

				</div>
				<Link to="/loginpage">
					<button className="btn btn-primary">Vamos a login</button>
				</Link>
				<Link to="/">
					<button className="btn btn-primary">Vamos a home</button>
				</Link>
			</div>
		</nav>
	);
};