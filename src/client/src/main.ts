import { createApp } from 'vue'
import App from './App.vue'
import directives from './directives/index'
import MockData from './mock.json'
import InstantSearch from 'vue-instantsearch/vue3/es'

const app = createApp(App)
directives(app)
app.use(InstantSearch)


if (__IN_VSCODE_WEBVIEW__) {
  // Handle messages sent from the extension to the webview
  window.addEventListener('message', (event) => {
    const message = event.data // The json data that the extension sent
    switch (message.type) {
      case 'update':
        const text = message.text
        handleAppMount(text)
    }
  })

  const handleAppMount = (text: string) => {
    try {
      let json = JSON.parse(text)
      if (Array.isArray(json)) {
        app.provide('imagesMetaData', json).mount('#app')
      }
    } catch {
      invalidTextHandle()
    }
  }
  const invalidTextHandle = () => {
    document.getElementById('app')!.innerText = '不是有效的 gifty 文件'
  }
} else {
  // mock data
  app.provide('imagesMetaData', MockData).mount('#app')
}
