import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'vuex', 'vue-i18n'],
          ui: ['element-plus', 'mosha-vue-toastify', 'fslightbox-vue'],
          media: ['@photo-sphere-viewer/core', 'cropperjs'],
          utils: ['axios', 'lodash', 'lodash-es', 'date-fns']
        }
      }
    },
    chunkSizeWarningLimit: 800
  }
})
