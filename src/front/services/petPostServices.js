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