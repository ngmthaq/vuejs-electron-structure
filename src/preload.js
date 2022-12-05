import { contextBridge, ipcRenderer } from "electron";
import VersionsRepo from "./repositories/versions.repo";

const isDevelopment = process.env.NODE_ENV !== "production";

ipcRenderer.on("createNewWindowFailure", function (evt, data) {
  alert(data.message);
});

// Database version control
new VersionsRepo().getLastVersion().then(response => {
  if (response.isSuccess) {
    // Update database version
  } else {
    // Initial database
    new VersionsRepo().createVersionsTable().then(status => {
      if (status) {
        new VersionsRepo().insertVersion();
      } else {
        console.error("Cannot create 'versions' table");
        alert("Failure to launch appication");
        window.close();
      }
    });
  }
});

contextBridge.exposeInMainWorld("electronFunctions", {
  createNewWindow: ({ name, devPath, prodPath }) => {
    ipcRenderer.send("createNewWindow", name, devPath, prodPath);
  },
});

contextBridge.exposeInMainWorld("electronProperties", {
  //
});
