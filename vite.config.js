import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'hate-frontend-production.up.railway.app'  // 👈 твой Railway-домен
    ]
  }
})
