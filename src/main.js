import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Create Vue app and use router
const app = createApp(App)
app.use(router)
app.mount('#app')

// Electron: Listen for route instructions from main process
if (window?.require) {
  const { ipcRenderer } = window.require('electron')

  // When main process sends 'set-route', navigate in Vue router
  ipcRenderer.on('set-route', (_, route) => {
    console.log('Navigating to route from Electron:', route)
    router.push(route)
  })
}

