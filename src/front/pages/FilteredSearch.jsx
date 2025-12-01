export const FilteredSearch = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.


  return (
    <form className="container mt-3">
      <div className="input-group mb-3">
        <select class="form-select" id="inputGroupSelect01">
          <option placeholder="Especie" selected>Especie</option>
          <option value="1">Perro</option>
          <option value="2">Gato</option>
          <option value="3">Hurón</option>
          <option value="4">Pájaro</option>
          <option value="5">Conejo</option>
          <option value="3">Otro</option>
        </select>
      </div>

      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Raza" aria-label="Raza"/>
      </div>

      <div className="mb-3">
        <div className="input-group">
          <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" placeholder="Color de pelo" />
        </div>
        <div className="form-text" id="basic-addon4">Ej: gris, negro con el pecho blanco, atigrado, tricolor...</div>
      </div>

      <div className="input-group mt-3 mb-3">
        <input type="text" className="form-control" placeholder="Color de ojos" />
      </div>

      <div className="mb-3">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Otros detalles" aria-label="Username" />
        </div>
        <div className="form-text" id="basic-addon4">Ej: oreja cortada, rabo cortado, le falta la pata..., le falta el ojo...,mancha en la espalda con forma...,...</div>
      </div>

      <div className="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label" for="exampleCheck1">Castrado</label>
      </div>

      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label" for="exampleCheck1">Tiene chip</label>
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit" className="boton-buscar btn btn-md mt-5 text-light">Buscar</button>
      </div>

    </form>

  );
};