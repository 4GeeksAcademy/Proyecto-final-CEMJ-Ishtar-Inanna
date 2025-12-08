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

export const Home =()=> {
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
		<div className="d-flex justify-content-center mt-4">
			<div
				className="card shadow-lg position-relative p-0"
				style={{
					width: "80%",
					maxWidth: "90%",
					minWidth: "80%"
				}}
			>

				<div className="position-relative bg-light rounded-top overflow-hidden" style={{ height: "250px" }}>
					<img
						src={slides[index].img}
						alt={`slide-${index}`}
						className="w-100 h-100 object-fit-contain position-absolute top-0 start-0"
					/>
				</div>

				<form
					className="d-flex position-absolute top-50 start-50 translate-middle w-75"
					role="search"
					style={{ zIndex: 10 }}
				>
					<input
						className="form-control me-2"
						type="search"
						placeholder="Búsqueda avanzada"
						aria-label="Search"
					/>
					<div>
						<Link to="/filteredsearch">
							<button className="btn btn-outline-success" type="submit">
								<i className="fa-solid fa-magnifying-glass"></i>
							</button>
						</Link>
					</div>
				</form>

				<div className="p-3" style={{ height: "130px", overflow: "hidden" }}>
					<h4 className="fw-bold mb-2">{slides[index].title}</h4>
					<p className="mb-0 text-truncate text-wrap" style={{ maxHeight: "80px", overflowY: "auto" }}>
						{slides[index].text}
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
		</div>

	);
}