import { fileURLToPath, resolve, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
const demoConfig = defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist-app'
  }
})

// https://vitejs.dev/config/
const libConfig = defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      // remove folder that are not needed in lib mode
      exclude: ['src/views/**', 'src/assets/**', 'src/router/**', 'src/stores/**', 'src/main.ts']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, '/src/lib.ts'),
      name: 'FormBuilder',
      // the proper extensions will be added
      fileName: 'form-builder'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'pinia', 'vue-router'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    },
    copyPublicDir: false
  }
})

export default defineConfig(({ command }) => {
  const buildMode: 'lib' | 'demo' = (process.env.MODE as 'lib' | 'demo') || 'demo'
  if (command === 'build') {
    if (buildMode === 'lib') return libConfig
    else return demoConfig
  } else {
    return demoConfig
  }
})
