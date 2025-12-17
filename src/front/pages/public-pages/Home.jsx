import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx"
import PerdidosVista from "../../assets/img/PerdidosVista.png";
import RefugiosVista from "../../assets/img/RefugiosVista.png";
import BusquedaVista from "../../assets/img/BusquedaFiltrada.png";
import Perros1 from "../../assets/img/Perros1.jpg";
import Perros2 from "../../assets/img/Perros2.jpg";

const slides = [
	{
		img: PerdidosVista,
		title: "Animales perdidos y encontrados",
		text: "Una forma de encontrar a tu animal perdido ya sea mediante su busqueda por los refugios mas cercanos a ti o por fotos de animales encontrados en la calle subidas por otros usuarios"
	},
	{
		img: RefugiosVista,
		title: "Refugios",
		text: "Una lista de refugios que colaboran con nosotros para facilitar la busqueda de animales perdidos y promocionar la adopcion de animales en necesidad"
	},
	{
		img: BusquedaVista,
		title: "Busqueda avanzada",
		text: "Introduce cualquier caracteristica del animal al que estas buscando, se filtran segun los datos introducidos para reducir el tiempo de busqueda y facilitar resultados optimos"
	}
	// {
	// 	img: Perros2,
	// 	title: "Ishtar Inanna",
	// 	text: "Ayudanos a ayudarlos"
	// }
];

const SLIDE_DURATION = 5000;

export const Home = () => {
	const [index, setIndex] = useState(0);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const slideInterval = setInterval(() => {
			setIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
			setProgress(0);
		}, SLIDE_DURATION);

		const progressInterval = setInterval(() => {
			setProgress(prev => Math.min(prev + 50 / SLIDE_DURATION * 100, 100));
		}, 50);

		return () => {
			clearInterval(slideInterval);
			clearInterval(progressInterval);
		};
	}, []);

	return (
		<div className="container my-5">

			<div className="row justify-content-center mb-5">
				<div className="col-lg-10">
					<div className="card shadow-lg p-0 position-relative">

						<div className="bg-light rounded-top overflow-hidden" style={{ height: "250px" }}>
							<img
								src={slides[index].img}
								alt="slide"
								className="w-100 h-100 object-fit-contain"
							/>
						</div>

						{/* Search */}
						<div className="position-absolute top-50 start-50 translate-middle w-75" style={{ zIndex: 10 }}>
							<div className="d-flex">
								<input
									className="form-control me-2"
									placeholder="Búsqueda avanzada"
								/>
								<Link to="/filteredsearch">
									<button className="btn btn-outline-success">
										<i className="fa-solid fa-magnifying-glass"></i>
									</button>
								</Link>
							</div>
						</div>

						<div className="p-3">
							<h4 className="fw-bold">{slides[index].title}</h4>
							<p className="text-muted mb-0">{slides[index].text}
							</p>
						</div>

						<div
							className="progress mt-2"
							style={{
								height: "6px",
								backgroundColor: "transparent",
								borderRadius: "3px",
								overflow: "hidden"
							}}
						>
							<div
								className="progress-bar"
								role="progressbar"
								style={{
									width: `${progress}%`,
									backgroundColor: "#6c757d",
									transition: "width 0.05s linear"
								}}
							></div>
						</div>
					</div>

					<div className="mb-5 pt-5">
						<h5 className="fw-bold mb-3 text-center text-dark">Como funciona?</h5>
						<h2 className="fw-bold mb-4 text-center">Encuentra a tu mascota en dos pasos</h2>
						<p className="text-muted mb-3 text-center">
							Nuestra plataforma ayuda el proceso de búsqueda y adopción de mascotas, haciendo que sea más fácil que nunca traer un nuevo compañero a tu vida.
						</p>

						<div className="row col-sm g-4 pt-5">
							<div className="col-sm">
								<div className="card h-100 border-light shadow-sm p-3 rounded-4">
									<div className="card-body">
										<div className="mb-3">
											<i className="fa-solid fa-magnifying-glass fs-2 text-dark"></i>
										</div>
										<h5 className="card-title fw-bold">Busca</h5>
										<p className="card-text text-muted small">
											Busca por nombre o características para encontrar mascotas perdidas o encontradas.
										</p>
									</div>
								</div>
							</div>
							<div className="col-sm">
								<div className="card h-100 border-light shadow-sm p-3 rounded-4">
									<div className="card-body">
										<div className="mb-3">
											<i className="fa-solid fa-handshake-angle fs-2 text-dark"></i>
										</div>
										<h5 className="card-title fw-bold">Contacta</h5>
										<p className="card-text text-muted small">
											Contacta directamente con el usuario para obtener más información sobre la mascota.
										</p>
									</div>
								</div>
							</div>

						</div>
					</div>
					<section className="mb-5 mt-5">
						<h3 className="fw-bold mb-4 text-center">Mascotas perdidas y encontradas</h3>

						<div className="row g-4">
							<div className="col-md-6">
								<Link to="/lostanimals" className="text-decoration-none">
									<div className="card border-0 rounded-4 shadow-sm overflow-hidden">
										<img src={Perros1} className="card-img-top" style={{ height: "300px", objectFit: "cover" }} />
										<div className="card-body p-4">
											<h5 className="fw-bold">Encontraste una mascota?</h5>
											<p className="text-success fw-semibold mb-2">Reportar mascota perdida</p>
											<p className="text-muted small">
												Ayuda a otros a encontrar a sus mascotas reportando las que encuentres.										</p>
										</div>
									</div>
								</Link>
							</div>

							<div className="col-md-6">
								<Link to="/foundanimals" className="text-decoration-none">
									<div className="card border-0 rounded-4 shadow-sm overflow-hidden">
										<img src={Perros2} className="card-img-top" style={{ height: "300px", objectFit: "cover" }} />
										<div className="card-body p-4">
											<h5 className="fw-bold">Buscando una mascota perdida?</h5>
											<p className="text-success fw-semibold mb-2">Ver mascotas encontradas</p>
											<p className="text-muted small">
												Explora el listado para ver si su compañero desaparecido ha sido encontrado.										</p>
										</div>
									</div>
								</Link>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};