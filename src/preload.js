import { contextBridge, ipcRenderer } from "electron";

const isDevelopment = process.env.NODE_ENV !== "production";

contextBridge.exposeInMainWorld("electronFunctions", {
  //
});

contextBridge.exposeInMainWorld("electronProperties", {
  //
});
