import { Link } from "react-router-dom";

export const Intro = () => {
    return (


        <form className="container mt-5" role="search">
            <input className="form-control bi bi-camera button btn btn-outline-success mx-1 fa-solid fa-magnifying-glass" type="search submit" placeholder="Búsqueda avanzada" aria-label="Search" to="/filteredsearch"/>
                {/* <button className="btn btn-outline-success mx-1" type="submit"><i className=""></i></button>

            </input> */}




        </form>


    );
};