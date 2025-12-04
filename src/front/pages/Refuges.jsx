import { Link } from "react-router-dom";

export const Refuges = () => {
   //     // Access the global state and dispatch function using the useGlobalReducer hook.


   return (
      <div className="background">
         <div className="container">
            <div className="card" style={{ width: "18rem" }}>           <img src="..." className="card-img-top" alt="..." />
               <div className="card-body">
                  <h5 className="card-title">Los Aristogatos de Boadilla</h5>
                  <p className="card-text">Asociación de protección animal en Boadilla del Monte</p>
                  <link to="/refugesite"><a href="#" className="boton btn btn-primary">Más información</a></link>
               </div>
            </div>
         </div>
      </div>

   );

};