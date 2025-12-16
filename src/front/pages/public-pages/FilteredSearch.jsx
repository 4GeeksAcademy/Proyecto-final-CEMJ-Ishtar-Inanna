import React, { useState, useEffect } from "react";
import { getAllPetPosts } from "../../services/petPostServices";

export const FilteredSearch = () => {
  const [allPets, setAllPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);

  // Filtros

  const [speciesFilter, setSpeciesFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [breedFilter, setBreedFilter] = useState("");
  const [physicalDescriptionFilter, setPhysicalDescriptionFilter] = useState("");
  const [colorFilter, setColorFilter] = useState([]);
  const [eyesColorFilter, setEyesColorFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState("");
  const [marksFilter, setMarksFilter] = useState([]);
  const [foundTimeFilter, setFoundTimeFilter] = useState("");
  const [actualLocationFilter, setActualLocationFilter] = useState("");

  // Normalizador
  const normalizePet = (pet) => ({
    ...pet,
    colors: Array.isArray(pet.colors)
      ? pet.colors
      : pet.colors?.split(",").map((c) => c.trim()) || [],
    marks: Array.isArray(pet.marks)
      ? pet.marks
      : pet.marks?.split(",").map((m) => m.trim()) || [],
    eyes_color: Array.isArray(pet.eyes_color)
      ? pet.eyes_color
      : pet.eyes_color?.split(",").map((e) => e.trim()) || [],
  });

  // Fetch inicial
  useEffect(() => {
    const fetchPets = async () => {
      const data = await getAllPetPosts();
      console.log(data);

      // const normalized = Array.isArray(data) ? data.map(normalizePet) : [];
      setAllPets(data.pets);
      // setFilteredPets(normalized);
    };
    fetchPets();
  }, []);

  // Filtrado automático
  const filteredEverything = () => {
    console.log("especies que queremos filtrar:" + speciesFilter);
    console.log("array sobre el que vamos a filtrar:" + allPets);
    const results = allPets.filter((pet) => (
      ((pet.species) === speciesFilter)
      // (!genderFilter || pet.gender === genderFilter) &&
      // (!breedFilter || pet.breed?.toLowerCase().includes(breedFilter.toLowerCase())) &&
      // (!physicalDescriptionFilter || pet.physical_description?.toLowerCase().includes(physicalDescriptionFilter.toLowerCase())) &&
      // (pet.actual_location?.toLowerCase().includes(actualLocationFilter.toLowerCase()))
      // (!foundTimeFilter || new Date(pet.found_time) >= new Date(foundTimeFilter)) &&
      // (!sizeFilter || pet.size === sizeFilter) &&
      // (!colorFilter.length || colorFilter.some(c => pet.colors.includes(c))) &&
      // (!eyesColorFilter.length || eyesColorFilter.some(c => pet.eyes_color.includes(c))) &&
      // (!marksFilter.length || marksFilter.some(m => pet.marks.includes(m)))
    ));
    console.log(results);
    setFilteredPets(results);
  }

  const clearAllFilters = () => {
    setSpeciesFilter("");
    setGenderFilter("");
    setBreedFilter("");
    setPhysicalDescriptionFilter("");
    setColorFilter([]);
    setEyesColorFilter([]);
    setSizeFilter("");
    setMarksFilter([]);
    setFoundTimeFilter("");
    setActualLocationFilter("");
  };

  const sendFilter = (e) => {
    e.preventDefault();
    filteredEverything();
    console.log(allPets);
    console.log(filteredPets);
    console.log("especie:" + speciesFilter);
    console.log("location:" + actualLocationFilter);
  };

  return (
    <div className="background">
      <form className="container mt-5" onSubmit={sendFilter}>

        {/* Especie */}
        <select className="form-select mb-3" value={speciesFilter} onChange={e => setSpeciesFilter(e.target.value)}>
          <option value="">Especie</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
          <option value="Hurón">Hurón</option>
          <option value="Pájaro">Pájaro</option>
          <option value="Conejo">Conejo</option>
          <option value="Otro">Otro</option>
        </select>

        {/* Sexo */}
        <div className="mb-3">
          <input type="checkbox" value="male" checked={genderFilter === "male"} onChange={e => setGenderFilter(genderFilter === e.target.value ? "" : e.target.value)} />
          <label className="mx-2">Macho</label>

          <input type="checkbox" value="female" checked={genderFilter === "female"} onChange={e => setGenderFilter(genderFilter === e.target.value ? "" : e.target.value)} />
          <label className="mx-2">Hembra</label>
        </div>

        {/* Raza */}
        <input type="text" className="form-control mb-3" placeholder="Raza" value={breedFilter} onChange={e => setBreedFilter(e.target.value)} />

        {/* Color pelaje */}
        <div className="mb-3 row">
          <label className="form-label">Color del pelaje / plumaje</label>
          {[["Negro", "Blanco", "Marrón"], ["Crema", "Amarillo", "Canela"], ["Atigrado", "Carey", "Naranja"]].map((group, i) => (
            <div key={i} className="col-3">
              {group.map(color => (
                <div key={color} className="form-check mb-2">
                  <input
                    type="checkbox"
                    id={`color-${color}`}
                    value={color}
                    checked={colorFilter.includes(color)}
                    onChange={e => {
                      if (e.target.checked) setColorFilter(prev => [...prev, color]);
                      else setColorFilter(prev => prev.filter(c => c !== color));
                    }}
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor={`color-${color}`}>{color}</label>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Color ojos */}
        <div className="mb-3 row">
          <label className="form-label">Color de ojos</label>
          {["Verde", "Marrón", "Azul", "Gris", "Heterocromía", "Naranja"].map(color => (
            <div key={color} className="col-2 mb-2 form-check">
              <input
                type="checkbox"
                id={`eye-${color}`}
                value={color}
                checked={eyesColorFilter.includes(color)}
                onChange={e => {
                  if (e.target.checked) setEyesColorFilter(prev => [...prev, color]);
                  else setEyesColorFilter(prev => prev.filter(c => c !== color));
                }}
                className="form-check-input"
              />
              <label className="form-check-label" htmlFor={`eye-${color}`}>{color}</label>
            </div>
          ))}
        </div>

        {/* Tamaño */}
        <select className="form-select mb-3 col-3" value={sizeFilter} onChange={e => setSizeFilter(e.target.value)}>
          <option value="">Tamaño</option>
          <option>Pequeño</option>
          <option>Mediano</option>
          <option>Grande</option>
        </select>

        {/* Marcas */}
        <div className="mb-3 row">
          <label className="form-label">Marcas distintivas</label>
          {[["Collar", "Arnés", "OrejaDañada"], ["ColaCorta", "OjosDistintos", "Cicatriz"], ["Ninguna", "Castrado", "TieneChip"]].map((group, i) => (
            <div key={i} className="col-3">
              {group.map(mark => (
                <div key={mark} className="mb-2 form-check">
                  <input
                    type="checkbox"
                    id={`mark-${mark}`}
                    value={mark}
                    checked={marksFilter.includes(mark)}
                    onChange={e => {
                      if (e.target.checked) setMarksFilter(prev => [...prev, mark]);
                      else setMarksFilter(prev => prev.filter(m => m !== mark));
                    }}
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor={`mark-${mark}`}>{mark}</label>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mb-3 row">
          <div className="col-3">
            <input className="form-control" placeholder="LUGAR DONDE SE ENCONTRÓ" value={actualLocationFilter} onChange={e => setActualLocationFilter(e.target.value)} />
          </div>
          <div className="col-3">
            <input type="datetime-local" className="form-control" value={foundTimeFilter} onChange={e => setFoundTimeFilter(e.target.value)} />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button type="submit" className="button btn btn-primary">Buscar</button>
          <button type="button" className="btn btn-outline-secondary" onClick={clearAllFilters}>Limpiar filtros</button>
        </div>
      </form>

      <div className="container mt-4">
        <h5>Resultados ({filteredPets.length})</h5>
        {filteredPets.map(pet => (
          <div key={pet.id} className="card mb-3 p-3">
            <h5>{pet.name || "Sin nombre"}</h5>
            <p><strong>Especie:</strong> {pet.species}</p>
            <p><strong>Gender:</strong> {pet.gender}</p>
            <p><strong>Raza:</strong> {pet.breed}</p>
            <p><strong>Size:</strong> {pet.size}</p>
            <p><strong>Ubicación:</strong> {pet.actual_location}</p>
          </div>
        ))}
        {filteredPets.length === 0 && <p className="text-muted">No se encontraron resultados</p>}
      </div>
    </div>
  );
};