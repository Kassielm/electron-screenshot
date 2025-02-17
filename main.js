const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: false // Desativa a política de segurança de origem
        }
    });

    mainWindow.loadFile("index.html");
});

// Serve para escutar o evento de captura do iframe, assim como um "observable"
ipcMain.on("capture-iframe", (event, rect) => {
    mainWindow.webContents.capturePage(rect).then((image) => {
        const imgData = image.toDataURL(); // Converte a imagem para base64
        event.reply("capture-iframe-reply", imgData); // Envia a imagem de volta para o renderer
    });
});

// Escutando evento para salvar a imagem
ipcMain.on("save-image", (event, imgData) => {
    const base64Data = imgData.replace(/^data:image\/png;base64,/, "");
    // Mude para o diretório que desejar
    const filePath = path.join("pictures", `${Date.now()}.png`);

    fs.writeFile(filePath, base64Data, "base64", (err) => {
        if (err) {
            console.error("Erro ao salvar a imagem:", err);
        } else {
            console.log("Imagem salva com sucesso em:", filePath);
        }
    });
}); 