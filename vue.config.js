const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'Master Learning',
        appId: 'com.master.learning',
        win: {
          target: 'nsis',
          icon: 'public/icons/app.ico',
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
          createDesktopShortcut: 'prompt',
          createStartMenuShortcut: true,
          installerIcon: 'public/icons/app.ico',
          uninstallerIcon: 'public/icons/app.ico',
          shortcutName: 'Master Learning',
        },
      },
    },
  },
})
