import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
    rollupOptions: {
      input: '/src/App.jsx'
    }
  },
  server: {
    origin: 'http://127.0.0.1:5173'
  },
  plugins: [react()]
})
