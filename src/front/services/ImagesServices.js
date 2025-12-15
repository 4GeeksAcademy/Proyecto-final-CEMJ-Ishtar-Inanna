// src/services/imagesServices.js

const cloud_name = "dlwvnnmhp";
const preset_name = "perfil_preset"; 

export const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", preset_name);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error("Error al subir imagen a Cloudinary");
    }

    const fileData = await response.json();
    return fileData.secure_url; 
  } catch (error) {
    console.error("Error en el servicio de imágenes:", error);
    throw error;
  }
};
