import React, { useState, useEffect } from "react";
import { getAllPetPosts } from "../../services/petPostServices";

export const FilteredSearch = () => {
  const [allPets, setAllPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);

  // Filtros
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [sexFilter, setSexFilter] = useState("");
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
      const normalized = Array.isArray(data) ? data.map(normalizePet) : [];
      setAllPets(normalized);
      setFilteredPets(normalized);
    };
    fetchPets();
  }, []);

  // Filtrado automático
  useEffect(() => {
    const results = allPets.filter((pet) => (
      (!speciesFilter || String(pet.species_id) === speciesFilter) &&
      (!sexFilter || pet.sex === sexFilter) &&
      (!breedFilter || pet.breed?.toLowerCase().includes(breedFilter.toLowerCase())) &&
      (!physicalDescriptionFilter || pet.physical_description?.toLowerCase().includes(physicalDescriptionFilter.toLowerCase())) &&
      (!actualLocationFilter || pet.actual_location?.toLowerCase().includes(actualLocationFilter.toLowerCase())) &&
      (!foundTimeFilter || new Date(pet.found_time) >= new Date(foundTimeFilter)) &&
      (!sizeFilter || pet.size === sizeFilter) &&
      (!colorFilter.length || colorFilter.some(c => pet.colors.includes(c))) &&
      (!eyesColorFilter.length || eyesColorFilter.some(c => pet.eyes_color.includes(c))) &&
      (!marksFilter.length || marksFilter.some(m => pet.marks.includes(m)))
    ));

    setFilteredPets(results);
  }, [allPets, speciesFilter, sexFilter, breedFilter, physicalDescriptionFilter, actualLocationFilter, foundTimeFilter, sizeFilter, colorFilter, eyesColorFilter, marksFilter]);

  const clearAllFilters = () => {
    setSpeciesFilter("");
    setSexFilter("");
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
  };

  return (
    <div className="background">
      <form className="container mt-5" onSubmit={sendFilter}>

        {/* Especie */}
        <select className="form-select mb-3" value={speciesFilter} onChange={e => setSpeciesFilter(e.target.value)}>
          <option value="">Especie</option>
          <option value="1">Perro</option>
          <option value="2">Gato</option>
          <option value="3">Hurón</option>
          <option value="4">Pájaro</option>
          <option value="5">Conejo</option>
          <option value="6">Otro</option>
        </select>

        {/* Sexo */}
        <div className="mb-3">
          <input type="checkbox" value="male" checked={sexFilter === "male"} onChange={e => setSexFilter(sexFilter === e.target.value ? "" : e.target.value)} />
          <label className="mx-2">Macho</label>

          <input type="checkbox" value="female" checked={sexFilter === "female"} onChange={e => setSexFilter(sexFilter === e.target.value ? "" : e.target.value)} />
          <label className="mx-2">Hembra</label>
        </div>

        {/* Raza */}
        <input type="text" className="form-control mb-3" placeholder="Raza" value={breedFilter} onChange={e => setBreedFilter(e.target.value)} />

        {/* Color pelaje */}
        <div className="mb-3 row">
          <label className="form-label">Color del pelaje / plumaje</label>
          {[ ["Negro", "Blanco", "Marrón"], ["Crema", "Amarillo", "Canela"], ["Atigrado", "Carey", "Naranja"] ].map((group, i) => (
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
          {[ ["Collar", "Arnés", "OrejaDañada"], ["ColaCorta", "OjosDistintos", "Cicatriz"], ["Ninguna", "Castrado", "TieneChip"] ].map((group, i) => (
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
            <input required className="form-control" placeholder="LUGAR DONDE SE ENCONTRÓ" value={actualLocationFilter} onChange={e => setActualLocationFilter(e.target.value)} />
          </div>
          <div className="col-3">
            <input type="datetime-local" className="form-control" value={foundTimeFilter} onChange={e => setFoundTimeFilter(e.target.value)} />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button type="submit" className="btn btn-primary">Buscar</button>
          <button type="button" className="btn btn-outline-secondary" onClick={clearAllFilters}>Limpiar filtros</button>
        </div>
      </form>

      <div className="container mt-4">
        <h5>Resultados ({filteredPets.length})</h5>
        {filteredPets.map(pet => (
          <div key={pet.id} className="card mb-3 p-3">
            <h5>{pet.name || "Sin nombre"}</h5>
            <p><strong>Raza:</strong> {pet.breed}</p>
            <p><strong>Descripción:</strong> {pet.physical_description}</p>
          </div>
        ))}
        {filteredPets.length === 0 && <p className="text-muted">No se encontraron resultados</p>}
      </div>
    </div>
  );
};