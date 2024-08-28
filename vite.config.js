import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg'
    })],
  resolve: {
    "alias": {
      '@hooks': fileURLToPath(new URL('./src/container/hooks', import.meta.url)),
      '@common': fileURLToPath(new URL('./src/container/common', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/container/core', import.meta.url)),
      '@container': fileURLToPath(new URL('./src/container/core', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/container/store', import.meta.url)),
      '@constants': fileURLToPath(new URL('./src/container/constants', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@assets': fileURLToPath(new URL('./public/assets', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@routes': fileURLToPath(new URL('./src/routes', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/entries', import.meta.url)),
    },
  },
})


