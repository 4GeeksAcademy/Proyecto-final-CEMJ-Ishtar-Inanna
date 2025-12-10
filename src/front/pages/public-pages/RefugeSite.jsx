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
                                <a href="#" className="button btn btn-primary mx-3">Donar</a>
                                <a href="#" className="button btn btn-primary">Voluntariado</a>
                            </div>
                        </div>
                    </div>
                    <div className="card mt-3 mb-3" style={{ width: "18rem" }}>
                        <p className="contact-phone"></p>
                        <p className="web"></p>
                        <p className="social-media"></p>
                    </div>
                    <div>
                        <p className="map"></p>
                    </div>
                </div>
                <div className="container mt-5 col-6">
                    <div className="card">
                        <b className="mt-3 mx-3">Sobre nosotros</b>
                        <p className="mx-3 mt-3">Somos una pequeña asociación de Boadilla del Monte. Los ARISTOGATOS ayudamos a los gatos de la calle. Nos preocupamos de su alimento y de su salud, procurando su adopción siempre que sea posible.</p>
                    </div>
                    <div className="mt-3 row">
                        <strong className="">Gatos en adopción</strong>
                        <div className="mt-3 d-flex justify-content-center
                        ">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Búsqueda avanzada"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );

};