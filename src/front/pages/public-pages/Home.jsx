import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx"
import Fondo from "../../assets/img/Fondo.png";
import Perros1 from "../../assets/img/Perros1.jpg";
import Perros2 from "../../assets/img/Perros2.jpg";
import "../Home.css"

const slides = [
	{
		img: Fondo,
		title: "Ishtar",
		text: "Una plataforma colaborativa diseñada para ayudar a reencontrar mascotas perdidas mediante la participación de la comunidad."
	},
	{
		img: Fondo,
		title: "Búsqueda avanzada",
		text: "Busca mascotas por nombre o características específicas y accede a resultados filtrados que reducen el tiempo de búsqueda."
	},
	{
		img: Fondo,
		title: "Contacto entre usuarios",
		text: "Comunícate fácilmente con quienes han encontrado o reportado mascotas para obtener información precisa y actuar de forma inmediata."
	},
	{
		img: Fondo,
		title: "Reporta y explora mascotas encontradas",
		text: "Publica mascotas encontradas o revisa el listado disponible para ayudar a otros y aumentar las posibilidades de reencuentro."
	}
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
					<div className="card shadow-lg p-0 position-relative home-carousel-card">

						<div className="home-carousel-image-wrapper rounded-top overflow-hidden">
							<img src={slides[index].img} alt="slide" />
						</div>


						<div className="home-carousel-content">
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
							<div className="home-carousel-progress">
								<div
									className="progress-bar"
									style={{ width: `${progress}%` }}
								/>
							</div>
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
											<p className="text-success fw-semibold mb-2">Ver mascotas perdidas</p>
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