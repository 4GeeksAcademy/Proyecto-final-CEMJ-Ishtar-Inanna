export const registerUser = async (userData) => {
  const response = await fetch(
    "https://scaling-invention-6wp99v5gqwgf4vpx-3001.app.github.dev/api/users",
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
