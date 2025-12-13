import React, { useState, useEffect } from "react";
import { items } from "..data/items";

import {
  filterItemsByCategory,
  filterPostsBySearchTerm,
  getUniqueCategories,
} from "./FilteredSearch";
import { items } from "..data/items";

function FilteredSearch() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState("");

  let filteredItems =
    selectedCategory === null
      ? items
      : filterItemsByCategory(items, selectedCategory);

  filteredItems = filterPostsBySearchTerm(filteredItems, selectedTerm);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const SearchTerm = (event) => {
    setSelectedTerm(event.target.value);
  }




}




// export const FilteredSearch = () => {
//   const [users, setUsers] = useState([])
//   const [filtered, setFiltered] = useState([]);

//   const [species, setSpecies] = useState("");
//   const [hairColor, setHairColor] = useState("");
//   const [eyeColor, setEyeColor] = useState("");
//   const [details, setDetails] = useState("");

//   const URL = 'https://jsonplaceholder.typicode.com/posts'

//   const showData = async () => {
//     const res = await fetch(URL);
//     const data = await res.json();

//     // const showData = async () => {
//     //   const response = await fetch(URL)
//     //   const data = await response.json()
//     //   setUsers(data)
//     //   console.log(data)
//     // }

//     const speciesList = ["Perro", "Gato", "Hurón", "Pájaro", "Conejo", "Otro"];
//     const colors = ["negro", "blanco", "gris", "marrón", "atigrado", "tricolor"];


//     const enhanced = data.map((item, i) => ({
//       ...item,
//       species: speciesList[i % speciesList.length],
//       hairColor: colors[(i + 1) % colors.length],
//       eyeColor: ["azules", "verdes", "marrones"][i % 3],
//       details: ["oreja cortada", "cola corta", "mancha en la espalda"][i % 3],
//     }));

//     setUsers(enhanced);
//     setFiltered(enhanced);
//   };

//   useEffect(() => {
//     showData();
//   }, []);

//   useEffect(() => {
//     let results = users;

//     if (species) {
//       results = results.filter((u) => u.species === species);
//     }

//     if (hairColor) {
//       results = results.filter((u) =>
//         u.hairColor.toLowerCase().includes(hairColor.toLowerCase())
//       );
//     }

//     if (eyeColor) {
//       results = results.filter((u) =>
//         u.eyeColor.toLowerCase().includes(eyeColor.toLowerCase())
//       );
//     }

//     if (details) {
//       results = results.filter((u) =>
//         u.details.toLowerCase().includes(details.toLowerCase())
//       );
//     }

//     setFiltered(results);
//   }, [species, hairColor, eyeColor, details, users]);


//   // Access the global state and dispatch function using the useGlobalReducer hook.


return (
  <div className="background">

    <form className="container mt-5">
      {/* {users.map((item) => (
        <div key={item.id} className="mb-5">
          <h5 className="mb-3">Post ID: {item.id}</h5>
          <p className="mb-3"><strong>Título:</strong> {item.title}</p> */}


          <div className="input-group mb-3">
            <select className="form-select" id="inputGroupSelect01" value={species}
              onChange={(e) => setSpecies(e.target.value)}>
              <option placeholder="Especie">Especie</option>
              <option value="1">Perro</option>
              <option value="2">Gato</option>
              <option value="3">Hurón</option>
              <option value="4">Pájaro</option>
              <option value="5">Conejo</option>
              <option value="3">Otro</option>
            </select>
          </div>

          <div className="input-group">
            <input type="checkbox" className="form-check-input" id={`macho-${item.id}`} />
            <label className="form-check-label" htmlFor={`macho-${item.id}`}>Macho</label>
            <input type="checkbox" className="form-check-input" id={`hembra-${item.id}`} />
            <label className="form-check-label" htmlFor={`hembra-${item.id}`}>Hembra</label>

          </div>

          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Raza, mestizo, mezcla de ..." aria-label="Raza" />
          </div>

          <div className="mb-3">
            <div className="input-group">
              <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" placeholder="Color de pelo" value={hairColor}
                onChange={(e) => setHairColor(e.target.value)} />
            </div>
            <div className="form-text" id="basic-addon4">Ej: gris, negro con el pecho blanco, atigrado, tricolor...</div>
          </div>

          <div className="input-group mt-3 mb-3">
            <input type="text" className="form-control" placeholder="Color de ojos" />
          </div>

          <div className="mb-3">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Otros detalles" />
            </div>
            <div className="form-text" id="basic-addon4">Ej: oreja cortada, rabo cortado, le falta la pata..., le falta el ojo...,mancha en la espalda con forma...,...</div>
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id={`castrado-${item.id}`} />
            <label className="form-check-label" htmlFor={`castrado-${item.id}`}>Castrado</label>
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id={`chip-${item.id}`} />
            <label className="form-check-label" htmlFor={`chip-${item.id}`}>Tiene chip</label>
          </div>

          <div action="upload_script.php" method="post" encType="multipart/form-data">
            <input type="file" name="archivo" />
            <input type="submit" value="Subir Archivo" />
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="button btn btn-md mt-5 text-light" onClick={() => handleCategoryClick(null)} className={selectedCategory === null ?}>Buscar</button>
          </div>
            ))}
        </form>  
    </div>



  //   {/* RESULTADOS FILTRADOS */}
  //   < h4 className="mb-3" > Resultados: {filtered.length}</h4>



  //   {filtered.map((item) => (
  //     <div key={item.id} className="card p-3 mb-3">

  //       <h5>{item.title}</h5>

  //       <p><strong>Especie:</strong> {item.species}</p>
  //       <p><strong>Color de pelo:</strong> {item.hairColor}</p>
  //       <p><strong>Color de ojos:</strong> {item.eyeColor}</p>
  //       <p><strong>Detalles:</strong> {item.details}</p>

  //     </div>
  //   ))}
  // </div>


);
};

