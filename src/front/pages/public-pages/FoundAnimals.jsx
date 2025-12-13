import { Link } from "react-router-dom";
import { getAllPetPosts, deletePetPost } from "../../services/petPostServices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';

export const FoundAnimals = () => {
    //     // Access the global state and dispatch function using the useGlobalReducer hook.

    const [petList, setPetList] = useState([])

    const testFetchMascotas = async () => {
        const response = await getAllPetPosts()
        setPetList(response.pets)
    }

        const deleteMascota = async (pet_id) => {
        const response = await deletePetPost(pet_id)
        testFetchMascotas()
        console.log(response)
    }

    const enriched = petList.map(p => ({
        ...p,
        details: Object.fromEntries(
            p.physical_description
                .split('|')
                .map(s => s.split(':', 2))
                .map(([k, v]) => {
                    const val = v.includes(';') ? v.split(';') : v || null;
                    return [k, val];
                })
        )
    }));

    console.log("Aqui esta la variable separada", enriched)


    useEffect(() => { testFetchMascotas() }, [])

    const newList = enriched.filter(pets => pets.is_lost == false)


    return (
        <div className="container">
            <div className="row my-3 mx-3">
                {newList.map((pets =>
                    <div className="col-3" key={pets.id}>
                        <div className="card mx-3 my-2" style={{ width: "18rem" }}>           <img src="..." className="card-img-top" alt="..." />
                            <p>{pets.found_location}</p>
                            <div className="card-body">
                                <h5 className="card-title">{pets.name}</h5>
                                <ul>
                                    <li className="card-text">{pets.breed}</li>
                                </ul>
                                <ul>
                                    <li className="card-text">{pets.details.Tamano}</li>
                                </ul>
                                <div>
                                    <Link to="/singleanimalview" state={{ id: pets.id }}>
                                        <p href="#" className="button btn btn-primary">Más información</p>
                                    </Link>
                                    <button onClick={()=>deleteMascota(pets.id)} className="button btn btn-primary">
                                        Delete entry
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};