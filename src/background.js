"use strict";

import path from "path";
import { app, protocol, BrowserWindow, Menu, Tray, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { autoUpdater } from "electron-updater";
import BACKGROUND_CONSTANTS from "./const/background.const";

const isDevelopment = process.env.NODE_ENV !== "production";

let windows = {};
let isForceToClose = false;
let isHideOnTaskbar = false;
let tray = null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true } }]);

async function createMainWindow({ name, devPath, prodPath }) {
  // Create the browser window.
  let window = new BrowserWindow({
    width: BACKGROUND_CONSTANTS.windowWidth,
    height: BACKGROUND_CONSTANTS.windowHeight,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  });

  // Config tray icon
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    tray = new Tray(path.resolve(__dirname, "../public/favicon.ico"));
  } else {
    tray = new Tray(path.resolve(__dirname, "./favicon.ico"));
  }

  // Trigger double click on tray icon
  tray.on("double-click", function () {
    window.show();
    isHideOnTaskbar = false;
  });

  // Set titile and tooltip
  tray.setTitle("App name");
  tray.setToolTip("App name");

  // Config tray menu
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Open",
        click: function () {
          window.show();
          isHideOnTaskbar = false;
        },
      },
      {
        label: "Quit",
        click: function () {
          isForceToClose = true;
          window.close();
        },
      },
    ]),
  );

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    window.setIcon(path.resolve(__dirname, "../public/favicon.ico"));
    await window.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath);

    // Auto open devtools
    // if (!process.env.IS_TEST) window.webContents.openDevTools();
  } else {
    // Load the index.html when not in development
    window.setIcon(path.resolve(__dirname, "./favicon.ico"));
    window.loadURL("app://./" + prodPath);
    autoUpdater.checkForUpdatesAndNotify();
  }

  window.on("close", e => {
    if (isForceToClose) {
      app.quit();
    } else {
      e.preventDefault();
      window.hide();
      isHideOnTaskbar = true;
    }
  });

  console.log(">>> Open " + name + " window ");

  ipcMain.on("createNewWindow", (e, name, devPath, prodPath) => {
    createNewWindow(e, name, devPath, prodPath, window);
  });

  return window;
}

async function createChildWindow({ name, devPath, prodPath }) {
  // Create the browser window.
  let window = new BrowserWindow({
    width: BACKGROUND_CONSTANTS.windowWidth,
    height: BACKGROUND_CONSTANTS.windowHeight,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    window.setIcon(path.resolve(__dirname, "../public/favicon.ico"));
    await window.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath);

    // Auto open devtools
    // if (!process.env.IS_TEST) window.webContents.openDevTools();
  } else {
    // Load the index.html when not in development
    window.setIcon(path.resolve(__dirname, "./favicon.ico"));
    window.loadURL("app://./" + prodPath);
  }

  window.on("close", () => {
    delete windows[name];
  });

  console.log(">>> Open " + name + " window ");

  return window;
}

// Create new child window
async function createNewWindow(_event, name, devPath, prodPath, window) {
  let names = Object.keys(windows);
  if (names.includes(name)) {
    window.webContents.send("createNewWindowFailure", { message: "Cannot open new window, window already existed" });
  } else {
    windows[name] = await createChildWindow({ name, devPath, prodPath });
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", e => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    console.log(">>> Trigger event 'window-all-closed' and condition !== darwin");
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (windows[BACKGROUND_CONSTANTS.windowPaths.main.name] === undefined) {
    windows[BACKGROUND_CONSTANTS.windowPaths.main.name] = createMainWindow(BACKGROUND_CONSTANTS.windowPaths.main);
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      // Install Vue Devtools
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error(">>> Vue Devtools failed to install: ", e.toString());
    }
  }

  if (!process.env.WEBPACK_DEV_SERVER_URL) {
    createProtocol("app");
  }

  windows[BACKGROUND_CONSTANTS.windowPaths.main.name] = createMainWindow(BACKGROUND_CONSTANTS.windowPaths.main);
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        console.log(">>> Trigger 'graceful-exit' message");
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      console.log(">>> Trigger 'SIGTERM' event");
      app.quit();
    });
  }
}
