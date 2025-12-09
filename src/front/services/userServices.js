import { BACKEND_URL } from "../main";

export const getUserById = async (userId) => {
  const response = await fetch(`${BACKEND_URL}users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener usuario: ${response.statusText}`);
  }

  return await response.json();
};
