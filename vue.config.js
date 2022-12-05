const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  configureWebpack: {
    devtool: "source-map",
  },
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload.js",
      externals: ["sqlite", "sqlite3"],
      builderOptions: {
        publish: ["github"],
        extraResources: ["src"],
        appId: "vue.electron.com",
        productName: "Vue Electron Application",
        win: {
          publisherName: "ngmthaq",
          icon: "dist_electron/bundled/favicon.ico",
          target: "nsis",
        },
        nsis: {
          oneClick: false,
          perMachine: true,
          allowToChangeInstallationDirectory: true,
          installerIcon: "dist_electron/bundled/favicon.ico",
          uninstallerIcon: "dist_electron/bundled/favicon.ico",
          artifactName: "vue-electron-application-setup-${version}.${ext}",
        },
      },
    },
  },
});
