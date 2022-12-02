import { contextBridge, ipcRenderer } from "electron";

const isDevelopment = process.env.NODE_ENV !== "production";

ipcRenderer.on("createNewWindowFailure", function (evt, data) {
  alert(data.message);
});

contextBridge.exposeInMainWorld("electronFunctions", {
  createNewWindow: ({ name, devPath, prodPath }) => {
    ipcRenderer.send("createNewWindow", name, devPath, prodPath);
  },
});

contextBridge.exposeInMainWorld("electronProperties", {
  //
});
