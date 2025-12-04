import { Link } from "react-router-dom";

export const RefugeSite = () => {
    //     // Access the global state and dispatch function using the useGlobalReducer hook.


    return (
        <div className="background">
            <div className="container">
                <div className="card" style={{ width: "18rem" }}>           <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Los Aristogatos de Boadilla</h5>
                        <p className="card-text">Asociación de protección animal en Boadilla del Monte</p>
                        <div>
                            <a href="#" className="boton btn btn-primary">Donate</a>
                            <a href="#" className="boton btn btn-primary">Voluntariado</a>
                        </div>
                    </div>
                    <div className="card" style={{ width: "18rem" }}>          
                    <div className="card-body">
                        <p className="contact-email"></p>
                        <p className="contact-phone"></p>
                        <p className="web"></p>
                        <p className="social-media"></p>
                        <div>
                            <a href="#" className="boton btn btn-primary">Donate</a>
                            <a href="#" className="boton btn btn-primary">Voluntariado</a>
                        </div>
                    </div>
                    <div>
                        <p className="map"></p>
                    </div>
                </div>
                </div>
            </div>
        </div>


    );

};