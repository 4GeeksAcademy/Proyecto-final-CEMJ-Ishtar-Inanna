import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer mt-auto py-5 bg-light text-muted">
		<div className="container">
			<div className="row justify-content-center text-center text-md-start">

				<div className="col-md-4 mb-4">
					<h6 className="text-uppercase fw-semibold mb-3 text-dark">
						Enlaces
					</h6>
					<ul className="list-unstyled">
						<li className="mb-2">
							<a href="/" className="text-muted text-decoration-none hover-link">
								Sobre nosotros
							</a>
						</li>
						<li className="mb-2">
							<a href="/lostanimals" className="text-muted text-decoration-none hover-link">
								Animales perdidos
							</a>
						</li>
						<li>
							<a href="/foundanimals" className="text-muted text-decoration-none hover-link">
								Animales encontrados
							</a>
						</li>
					</ul>
				</div>

				<div className="col-md-4 mb-4">
					<h6 className="text-uppercase fw-semibold mb-3 text-dark">
						Información
					</h6>
					<p className="mb-0">
						<strong className="text-dark">Ishtar</strong><br />
						Plataforma creada para ayudar a animales perdidos y encontrados.
					</p>
				</div>
			</div>

			<hr className="my-4" />

			<div className="text-center small">
				© 2025 <strong>Ishtar</strong> — Todos los derechos reservados.
			</div>
		</div>
	</footer>
);
