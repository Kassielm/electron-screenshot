const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    captureIframe: (rect) => ipcRenderer.send("capture-iframe", rect),
    onCaptureIframeReply: (callback) => ipcRenderer.on("capture-iframe-reply", callback),
    saveImage: (imgData) => ipcRenderer.send("save-image", imgData)
});