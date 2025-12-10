import { Link } from "react-router-dom";

export const FoundLostAnimals = () => {
    //     // Access the global state and dispatch function using the useGlobalReducer hook.



    return (
        <div className="background">
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="card col-3 mx-5" style={{ width: "18rem" }}>           <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">PERDIDOS</h5>
                            <Link to="/lostanimals"><p href="#" className="boton btn btn-primary">Consultar</p></Link>
                        </div>
                    </div>
                    <div className="card col-3" style={{ width: "18rem" }}>           <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">ENCONTRADOS</h5>
                            <Link to="/foundanimals"><p href="#" className="boton btn btn-primary">Consultar</p></Link>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link to="/auth/registerpets"><p href="#" className="boton btn btn-primary">REGISTRO MASCOTA PERDIDA/ENCONTRADA</p></Link>
                    </div>
                </div>
            </div>
        </div >
    );
};