import { act } from "react";

//Añadir los fetch
export const getAllPetPosts = async () => {
  const response = await fetch(
    'AQUI VA A IR LA URL DEL BACK',
    {
      method: "GET",
      headers: { 
        accept: "application/json",
      },body : {
 
      }
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data.agendas;
  } else {
    const message = { error: response.statusText };
    console.log(message);
  }
};

export const createPetPost = async (f_location, a_location, time, name, breed, physical_descrption) => {
  const r = await fetch(
    `${BACKEND_URL}api/pets`,
    {
      method: "POST",
      headers: { 
        accept: "application/json",
      },body : { 
        "found_location": f_location,
        "actual_location": a_location,
        "found_time": time,
        "name": name,
        "breed": breed,
        "physical_descrption": physical_descrption,
      }
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data.agendas;
  } else {
    const message = { error: response.statusText };
    console.log(message);
  }
};


// const raw = "";

// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow"
// };

// fetch("https://automatic-spoon-97x5x995pg65fppvp-3001.app.github.dev/api/pets", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));





//Test de push