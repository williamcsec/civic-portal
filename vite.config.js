import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Ensure environment variables are available
    'import.meta.env': 'import.meta.env'
  },
  server: {
    port: 3000,
    host: true
  },
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
