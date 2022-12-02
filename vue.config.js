const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  configureWebpack: {
    devtool: "source-map",
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        publish: ["github"],
        appId: "vue.electron.com",
        productName: "Vue Electron Application",
        win: {
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
