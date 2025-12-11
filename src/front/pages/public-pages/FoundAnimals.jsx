import { Link } from "react-router-dom";

export const FoundAnimals = () => {
    //     // Access the global state and dispatch function using the useGlobalReducer hook.


    
    return (
        <div className="container">
        <div className="card" style={{width: "18rem"}}>           <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Kitty</h5>
                <ul>
                    <li className="card-text">Gata joven.</li>
                    <li className="card-text">Negra con tres patas blancas</li>
                    <li className="card-text">Ojos verdes.</li>
                    <li className="card-text">Con una pequeña mancha blanca en el pecho.</li>
                </ul>
                <a href="#" className="button btn btn-primary">Contactar</a>
            </div>
        </div>
        </div>
    );
};