import { createApp, ref } from 'vue'
import App from './App.vue'
import directives from './directives/index'
import MockData from './mock.json'

const app = createApp(App)
directives(app)

let data = ref(new Array())
app.provide('imagesMetaData', data).mount('#app')
console.log(1111111, data.value)

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
        data.value = json
        // app.provide('imagesMetaData', json).mount('#app')
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
  data.value = MockData
  console.log(2222222, data.value)
  // app.provide('imagesMetaData', MockData).mount('#app')
}
