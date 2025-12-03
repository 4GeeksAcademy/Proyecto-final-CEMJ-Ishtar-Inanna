import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/auth/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>

				</div>
				<div>
					<Link to="/loginpage">
						<button className="btn btn-primary">Vamos a login</button>
					</Link>
					<Link to="/registerpage">
						<button className="btn btn-primary">Vamos a register</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};