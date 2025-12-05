import { BACKEND_URL } from "../main";

export const registerUser = async (userData) => {
  const response = await fetch(
    `${BACKEND_URL}users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    throw new Error(`Error en el registro: ${response.statusText}`);
  }

  return await response.json();
};
