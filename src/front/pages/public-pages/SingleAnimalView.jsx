import { Link } from "react-router-dom";
import { getAllPetPosts } from "../../services/petPostServices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import Map from "../../components/Map";


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
                    const val = v?.includes(';') ? v.split(';') : (v || null);
                    return [k.trim(), val];
                })
        ),
        foundCoords: p.found_location
            ? (() => {
                const [lat, lng] = p.found_location.split(',').map(Number);
                return { lat, lng };
            })()
            : (() => {
                const [lat, lng] = p.actual_location.split(',').map(Number);
                return { lat, lng };
            })(),
    }));
    console.log(enriched)
    useEffect(() => { testFetchMascotas() }, [])

    const pet = enriched.find(p => p.id === id_mascota);
    if (!pet) return <p>Mascota no encontrada</p>;

    return (
        <div className="container py-4">
            <div className="row">
                {/*  left column – data  */}
                <div className="col-md-6">
                    <p>Imagen MOIII</p>

                    <h5>Especie</h5>
                    <p>{pet.breed}</p>

                    <h5>Tamaño</h5>
                    <p>{pet.details.Tamaño}</p>

                    <h5>Tipo de pelaje</h5>
                    <p>{pet.details.Pelo}</p>

                    <h5>Marcas características</h5>
                    <div>
                        {Array.isArray(pet.details.Marcas) &&
                            pet.details.Marcas.map(m => <p key={m}>{m}</p>)}
                    </div>

                    <h5>Colores del animal</h5>
                    <div>
                        {Array.isArray(pet.details.Color) &&
                            pet.details.Color.map(m => <p key={m}>{m}</p>)}
                    </div>
                </div>

                {/*  right column – map  */}
                <div className="col-md-6">
                    <h5>Lugar donde se encontró</h5>
                    {pet.foundCoords ? (
                        <>
                            <p className="text-muted">
                                {pet.foundCoords.lat.toFixed(6)}, {pet.foundCoords.lng.toFixed(6)}
                            </p>
                            <div className="rounded overflow-hidden" style={{ height: 300 }}>
                                <Map value={pet.foundCoords} readOnly />
                            </div>
                        </>
                    ) : (
                        <p>No se indicó ubicación</p>
                    )}
                </div>
            </div>
        </div>
    );
};