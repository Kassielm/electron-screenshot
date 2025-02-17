document.getElementById("capture").addEventListener("click", async function () {
  // Obtém o iframe e suas dimensões
  const iframe = document.getElementById("iframe");
  const rect = iframe.getBoundingClientRect();

  // Define as coordenadas e dimensões para captura
  const captureRect = {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
  };

  // Solicita ao processo principal para capturar o iframe
  window.electron.captureIframe(captureRect);

  // Escuta a resposta do processo principal com a imagem capturada
  window.electron.onCaptureIframeReply((event, imgData) => {
      // Exibe a imagem na tela
      let img = document.createElement("img");
      img.src = imgData;
      img.style.border = "1px solid black";
      img.style.width = "100%";

      let capturedDiv = document.getElementById("capturedImage");
      capturedDiv.innerHTML = "";
      capturedDiv.appendChild(img);

      // Envia a imagem para o processo principal salvar
      window.electron.saveImage(imgData);
  });
});