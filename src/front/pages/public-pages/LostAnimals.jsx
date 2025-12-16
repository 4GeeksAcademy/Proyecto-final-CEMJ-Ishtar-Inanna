import { Link } from "react-router-dom";
import { getAllPetPosts, deletePetPost } from "../../services/petPostServices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';

export const LostAnimals = () => {

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

    const newList = enriched.filter(pets => pets.is_lost == true)

    return (
        <div className="container py-4">
            <div className="row g-4">
                {newList.map(pet => (
                    <div key={pet.id} className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <img
                                src={
                                    pet.images?.[0] ||
                                    'https://loremipsum.imgix.net/2uTVCl4WzwqJP5ywFNzukO/8acb2b2cf872f3f5706c4bd63295ba31/placekitten.jpeg?w=1280&q=60&auto=format,compress'
                                }
                                className="card-img-top"
                                alt={pet.name}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />

                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{pet.name}</h5>

                                <ul className="list-unstyled mb-3">
                                    <li className="text-muted">{pet.breed}</li>
                                    <li className="text-muted">{pet.details?.Tamano}</li>
                                </ul>

                                <div className="mt-auto d-flex gap-2 justify-content-center">
                                    <Link
                                        to="/singleanimalview"
                                        state={{ id: pet.id }}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Más información
                                    </Link>

                                    <button
                                        onClick={() => deleteMascota(pet.id)}
                                        className="btn btn-outline-danger btn-sm"
                                    >
                                        Delete
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