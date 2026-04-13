import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Port 5173 = store (user). Admin uses 5174 so both can run together without swapping URLs.
export default defineConfig({
  // '/' keeps History API routes (/shop, /profile) aligned with the dev server and typical static hosts (SPA fallback).
  base: '/',
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
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