import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        fc3: resolve(__dirname, 'facecrusher3.html')
        // Add more pages as needed
      }
    }
  }
})