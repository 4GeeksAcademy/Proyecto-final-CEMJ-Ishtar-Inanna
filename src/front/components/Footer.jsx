export const Footer = () => (
	<footer className="footer mt-auto py-5 bg-light text-muted">
		<div className="container">
			<div className="row text-center text-md-start">

				<div className="col-md-4 mb-4">
					<h6 className="text-uppercase fw-bold mb-3">Enlaces</h6>
					<ul className="list-unstyled">
						<li><a href="/" className="text-muted text-decoration-none">About</a></li>
						<li><a href="/" className="text-muted text-decoration-none">Contacto</a></li>
						<li><a href="/refuges" className="text-muted text-decoration-none">Refugios</a></li>
						<li><a href="/foundlostanimals" className="text-muted text-decoration-none">Animales Perdidos/Encontrados</a></li>
					</ul>
				</div>

				<div className="col-md-4 mb-4">
					<h6 className="text-uppercase fw-bold mb-3">Información</h6>
					<p>
						<strong>Ishtar/Inanna</strong> <br></br>
						Plataforma creada para ayudar a animales perdidos y encontrados
					</p>
				</div>

				<div className="col-md-4 mb-4 text-center">
					<h6 className="text-uppercase fw-bold mb-3">Síguenos</h6>
					<a href="#" className="mx-3 text-muted fs-4">
						<i className="fa-brands fa-instagram"></i>
					</a>
					<a href="#" className="mx-3 text-muted fs-4">
						<i className="fa-brands fa-x-twitter"></i>
					</a>
				</div>

			</div>

			<div className="text-center mt-4 small">
				© 2025 Ishtar/Inanna — Todos los derechos reservados.
			</div>
		</div>
	</footer>
);
