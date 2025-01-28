export const getBase64FromImageUrl = async (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Evitar problemas CORS
  
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
  
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
  
        // Convertir imagen a base64
        const base64String = canvas.toDataURL("image/png"); // Cambia el formato si es necesario
        resolve(base64String);
      };
  
      img.onerror = () => reject(new Error("Error al cargar la imagen"));
  
      img.src = url;
    });
  };