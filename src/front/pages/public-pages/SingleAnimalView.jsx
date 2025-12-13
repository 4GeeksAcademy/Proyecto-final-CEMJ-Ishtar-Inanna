import { Link } from "react-router-dom";
import { getAllPetPosts } from "../../services/petPostServices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';


export const SingleAnimalView = () => {

    const { state } = useLocation();   // { id: 25 }
    const id_mascota = state?.id;

    const [petList, setPetList] = useState([])

    const testFetchMascotas = async () => {
        const response = await getAllPetPosts()
        setPetList(response.pets)
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

    useEffect(() => { testFetchMascotas() }, [])

    const pet = enriched.find(p => p.id === id_mascota);
    if (!pet) return <p>Mascota no encontrada</p>;
    console.log(pet)
    return (
        <div className="container">
            <div>
                <p>Imagen MOIII</p>
                <h5>Especie</h5>
                <p>{pet.breed}</p>
                <h5>Tamaño</h5>
                <p>{pet.details.Tamano}</p>
                <h5>Tipo de pelaje</h5>
                <p>{pet.details.Pelo}</p>
                <h5>marcas características</h5>
                <h5>Colores del animal</h5>
                <div>{Array.isArray(pet.details.Color) && pet.details.Color.map(m => <p key={m}>{m}</p>)}</div>
                <p>{Array.isArray(pet.details.Marcas) && pet.details.Marcas.map(m => <li key={m}>{m}</li>)}</p>
            </div>

        </div>
    );
};