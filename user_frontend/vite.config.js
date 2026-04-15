import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'https://api.farmycure.com',
        changeOrigin: true,
        timeout: 60_000,
        proxyTimeout: 60_000,
      },
    },
  },
  preview: {
    port: 5173,
    host: true,
    allowedHosts: true,
  },
})