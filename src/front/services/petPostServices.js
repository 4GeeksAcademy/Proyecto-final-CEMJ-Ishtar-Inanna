import { act } from "react";
import { BACKEND_URL } from "../main";

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

export const createPetPost = async (fetchData) => {
  console.log("Hola estas dentro de createPetPost")
  const response = await fetch(
    `${BACKEND_URL}pets`,
    {
      method: "POST",
      headers: { 
        accept: "application/json",
        "Content-Type":"application/json"
      },body : JSON.stringify(fetchData)
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