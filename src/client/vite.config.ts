import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isServe = command === 'serve'
  return {
    plugins: [
      vue(),
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      })
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/main.ts'),
        formats: ['iife'],
        name: 'client',
        fileName: (format) => `client.${format}.js`
      },
      outDir: resolve(__dirname, '../../media')
    },
    define: {
      __IN_VSCODE_WEBVIEW__: isServe ? 'false' : 'true'
    }
  }
})
