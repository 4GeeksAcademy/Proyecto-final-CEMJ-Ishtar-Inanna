import { Link } from "react-router-dom";

export const RefugeSite = () => {
    //     // Access the global state and dispatch function using the useGlobalReducer hook.



    return (
        <div className="background">
            <div className="container row">
                <div className="container col-3">
                    <div className="card mt-5" style={{ width: "18rem" }}>           <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Los Aristogatos de Boadilla</h5>
                            <p className="card-text">Asociación de protección animal en Boadilla del Monte</p>
                            <div>
                                <a href="#" className="boton btn btn-primary mx-3">Donate</a>
                                <a href="#" className="boton btn btn-primary">Voluntariado</a>
                            </div>
                        </div>
                    </div>
                    <div className="card mt-5 mb-5" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <p className="contact-email"></p>
                            <p className="contact-phone"></p>
                            <p className="web"></p>
                            <p className="social-media"></p>
                        </div>
                        <div>
                            <p className="map"></p>
                        </div>
                    </div>
                </div>
                <div className="container mt-5 col-6 ">
                    <div className="card">
                        <b className="mt-3 mx-3">Sobre nosotros</b>
                        <p className="mx-3 mt-3">Cuidamos y alimentamos a los gatos de las colonias de Boadilla</p>
                    </div>
                    <div className="mt-5">
                        <strong className="">Gatos en adopción</strong>
                        <input className="form-control bi bi-camera button btn btn-outline-success mt-3 mx-1 fa-solid fa-magnifying-glass" type="search submit" placeholder="Búsqueda avanzada" aria-label="Search" to="/filteredsearch" />
                    </div>
                </div>
            </div>
        </div>



    );

};