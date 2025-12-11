import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPetPost } from "../../services/petPostServices";
import { useNavigate } from "react-router-dom"
import { getAuthentication } from "../../services/loginServices";

export const RegisterPets = () => {

    const [foundLocation, setFoundLocation] = useState("");
    const [actualLocation, setActualLocation] = useState("");
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [physicalDescription, setPhysicalDescription] = useState("");
    const [foundTime, setFoundTime] = useState("")

    const [formData, setFormData] = useState(
        { found_location: "", actual_location: "", found_time: "", name: "", breed: "", physical_desctiption: "" })

    useEffect(() => {
        setFormData({
            user_id:localStorage.getItem("user_id"),
            found_location: foundLocation,
            actual_location: actualLocation,
            found_time: foundTime, 
            name,
            breed,
            physical_desctiption: physicalDescription
        })
    }, [foundLocation, actualLocation, foundTime, name, breed, physicalDescription])

// '2025-12-11T15:30'

    const sendNewPetPost = async (formData) => {
        const response = await createPetPost(formData)
        console.log(response)
    }

    return (
        <div className="container d-flex flex-column align-items-center mt-5">

            <h1 className="mb-4">Crear ficha de búsqueda</h1>
            <form
                //onSubmit={}
                className="w-100"
                style={{ maxWidth: "420px" }}
            >

                <div className="mb-3">
                    <label className="form-label">Lugar donde se perdió/encontró</label>
                    <input
                        className="form-control"
                        type="lugar"
                        placeholder="LUGAR DONDE SE VIO POR ÚLTIMA VEZ"
                        onChange={({ target }) => setFoundLocation(target.value)}
                        value={foundLocation}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Localización actual (en caso de haber encontrado un animal)</label>
                    <input
                        className="form-control"
                        placeholder="LOCALIZACIÓN"
                        onChange={({ target }) => setActualLocation(target.value)}
                        value={actualLocation}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        className="form-control"
                        placeholder="NOMBRE"
                        onChange={({ target }) => setName(target.value)}
                        value={name}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Raza/Mestizo</label>
                    <input
                        className="form-control"
                        placeholder="RAZA/MESTIZO"
                        onChange={({ target }) => setBreed(target.value)}
                        value={breed}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input
                        className="form-control"
                        placeholder="DESCRIPCIÓN"
                        onChange={({ target }) => setPhysicalDescription(target.value)}
                        value={physicalDescription}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input
                        className="form-control"
                        placeholder="HORA DE ENCUENTRO"
                        type="datetime-local"
                        onChange={({ target }) => setFoundTime(target.value)}
                        value={foundTime}

                    />
                </div>


                <div className="mb-3 d-flex justify-content-end">
                    <button onClick={() => sendNewPetPost(formData)} type="button" className="boton btn btn-success px-4 py-2">
                        REGISTRAR
                    </button>
                </div>

            </form>
        </div>
    )
}