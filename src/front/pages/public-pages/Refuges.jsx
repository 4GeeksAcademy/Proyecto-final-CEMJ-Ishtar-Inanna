import { Link } from "react-router-dom";

export const Refuges = () => {

   return (
      <div className="background">
         <div className="container">
            <div className="card">
               <div className="card-body">
                  <h5 className="card-title">Los Aristogatos de Boadilla</h5>
                  <p className="card-text">Asociación de protección animal en Boadilla del Monte</p>
                  <Link to="/refugesite"><p href="#" className="boton btn btn-primary">Más información</p></Link>
               </div>
            </div>
         </div>
      </div>

   );

};