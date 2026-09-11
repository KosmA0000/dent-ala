import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/dent-ala/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 5176,
    host: true,
  },
})
