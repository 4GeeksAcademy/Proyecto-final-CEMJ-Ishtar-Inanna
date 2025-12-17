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

// ACTUALIZAR USUARIO (PUT)
export const updateUser = async (userId, userData) => {
  const response = await fetch(`${BACKEND_URL}users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `Error al actualizar: ${response.statusText}`
    );
  }

  return await response.json();
};

// ELIMINAR USUARIO (DELETE)
export const deleteUser = async (userId) => {
  const response = await fetch(`${BACKEND_URL}users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `Error al eliminar: ${response.statusText}`
    );
  }

  return true; // Retornamos true si salió bien
};

// PERFIL PUBLICO DE USUARIO
export const getPublicUser = async (userId) => {
  const response = await fetch(`${BACKEND_URL}users/${userId}/public`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener perfil: ${response.statusText}`);
  }

  return await response.json();
};
