import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

//Agregar un carrusel con Bootstrap con slides automaticos que resuman cada vista de la pagina

const texts = [
	"Bienvenido a nuestra página, donde encontrarás las mejores ofertas.",
	"Explora nuestros productos destacados y descubre nuevas oportunidades.",
	"Contamos con envíos rápidos y atención personalizada.",
	"Tu satisfacción es nuestra prioridad."
];

export default function Home() {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) =>
				prev === texts.length - 1 ? 0 : prev + 1
			);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div style={styles.container}>
			<p style={styles.text}>{texts[index]}</p>
		</div>
	);
}

const styles = {
	container: {
		width: "100%",
		height: "150px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "20px",
		backgroundColor: "#f2f2f2",
		borderRadius: "10px",
		boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
		marginTop: "20px",
	},
	text: {
		fontSize: "1.5rem",
		textAlign: "center",
		maxWidth: "80%",
		transition: "opacity 0.5s ease",
	},
};