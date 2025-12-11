import { Link } from "react-router-dom";
import { getAllPetPosts } from "../../services/petPostServices";
import { useEffect, useState } from "react";


export const FoundAnimals = () => {
    //     // Access the global state and dispatch function using the useGlobalReducer hook.

    const [petList, setPetList] = useState([])

    const testFetchMascotas = async () => {
        const response = await getAllPetPosts()
        setPetList(response.pets)
    }

    useEffect(() => { testFetchMascotas() }, [])

    console.log(petList)

    return (
        <div className="container">
            <div className="row my-3 mx-3">
                {petList.map((pets =>
                    <div className="col-3" key={pets.id}>
                        <div className="card mx-3 my-2" style={{ width: "18rem" }}>           <img src="..." className="card-img-top" alt="..." />
                            <p>{pets.found_location}</p>
                            <div className="card-body">
                                <h5 className="card-title">{pets.name}</h5>
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
                ))}
            </div>
        </div>
    );
};