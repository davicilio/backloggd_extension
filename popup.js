// Al cargar la interfaz, establecer el estado inicial
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get("notaFormat", (data) => {
      const format = data.notaFormat || "none"; // Por defecto, no se ejecuta ninguna acción
      updateButtonState(format);
    });
  });
  
  // Manejar clics en los botones
  document.getElementById("show5").addEventListener("click", () => {
    updateNotaFormat("show5");
  });
  
  document.getElementById("show10").addEventListener("click", () => {
    updateNotaFormat("show10");
  });
  
  // Función para actualizar el formato de la nota
  function updateNotaFormat(format) {
    chrome.storage.sync.set({ notaFormat: format }, () => {
      updateButtonState(format);
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: format });
      });
    });
  }
  
  // Función para actualizar el estado de los botones
  function updateButtonState(format) {
    const btn5 = document.getElementById("show5");
    const btn10 = document.getElementById("show10");
  
    // Habilitar/deshabilitar botones según el estado
    btn5.disabled = format !== "show10"; // show5 solo se habilita si el estado es show10
    btn10.disabled = format === "show10"; // show10 se deshabilita después de pulsarlo
  }