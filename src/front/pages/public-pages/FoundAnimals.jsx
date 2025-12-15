import { Link } from "react-router-dom";
import { getAllPetPosts, deletePetPost } from "../../services/petPostServices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';

export const FoundAnimals = () => {

    const [petList, setPetList] = useState([])

    const testFetchMascotas = async () => {
        const response = await getAllPetPosts()
        setPetList(response.pets)
    }

    const deleteMascota = async (pet_id) => {
        const response = await deletePetPost(pet_id)
        testFetchMascotas()
    }

    const enriched = petList.map(p => ({
        ...p,
        details: Object.fromEntries(
            p.physical_description
                .split('|')
                .map(s => s.split(':', 2))
                .map(([k, v]) => {
                    const val = v?.includes(';') ? v.split(';') : (v || null);
                    return [k.trim(), val];
                })
        )
    }));

    useEffect(() => { testFetchMascotas() }, [])

    const newList = enriched.filter(pets => pets.is_lost == false)

    console.log(newList)

    return (
        <div className="container">
            <div className="row my-3 mx-3">
                {newList.map((pets =>
                    <div className="col-3" key={pets.id}>
                        <div className="card mx-3 my-2" style={{ width: "18rem" }}>
                            <img
                                src={pets.images && pets.images.length > 0 ? pets.images[0] : 'https://loremipsum.imgix.net/2uTVCl4WzwqJP5ywFNzukO/8acb2b2cf872f3f5706c4bd63295ba31/placekitten.jpeg?w=1280&q=60&auto=format,compress'}
                                className="card-img-top"
                                alt={pets.name}
                                style={{ height: "200px", objectFit: "cover" }}
                            />                            
                            <p>{pets.actual_location}</p>
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
                                    <button onClick={() => deleteMascota(pets.id)} className="button btn btn-primary">
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