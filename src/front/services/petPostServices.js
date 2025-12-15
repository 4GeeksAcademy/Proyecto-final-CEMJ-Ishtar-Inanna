import { act } from "react";
import { BACKEND_URL } from "../main";

//Añadir los fetch
export const getAllPetPosts = async () => {
  const response = await fetch(`${BACKEND_URL}pets`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const message = { error: response.statusText };
    console.log(message);
  }
};

export const createPetPost = async (fetchData) => {
  const response = await fetch(`${BACKEND_URL}pets`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fetchData),
  });
  console.log(response);
  if (response.ok) {
    const data = await response.json();
    return data.agendas;
  } else {
    const message = { error: response.statusText };
    console.log(message);
  }
};

export const deletePetPost = async (fetchData) => {
  const response = await fetch(`${BACKEND_URL}pets/${fetchData}`, {
    method: "DELETE",
    headers: {
      accept: "application/json"
    }
  });
if (response.ok){
  return "Done"
}
};
