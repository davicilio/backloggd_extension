// Función para formatear el número
function formatNumber(num) {
    let str = num.toFixed(2); // Asegura 2 decimales
    str = str.replace(/\.?0+$/, ""); // Elimina ceros finales y el punto si es necesario
    return str;
  }
  
  // Función para actualizar la nota media
  function updateNotaMedia(format) {
    const notaMediaElement = document.querySelector("#score > h1"); // Ajusta el selector según la estructura de la página
    if (notaMediaElement) {
      const notaMedia = parseFloat(notaMediaElement.textContent);
      let nuevaNota;
  
      if (format === "show5") {
        nuevaNota = notaMedia / 2;
      } else if (format === "show10") {
        nuevaNota = notaMedia * 2;
      }
  
      notaMediaElement.textContent = formatNumber(nuevaNota);
    }
  }
  
  // Escuchar mensajes desde la interfaz de usuario
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "show5" || request.action === "show10") {
      updateNotaMedia(request.action);
      chrome.storage.sync.set({ notaFormat: request.action }); // Guardar el estado actual
    }
  });
  
  // Verificar el estado al cargar la página
  chrome.storage.sync.get("notaFormat", (data) => {
    const format = data.notaFormat || "none"; // Por defecto, no se ejecuta ninguna acción
    if ( format === "show10") {
      updateNotaMedia(format); // Aplicar el formato guardado.
    }
  });