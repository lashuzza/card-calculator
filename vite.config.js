import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Hardcode the API URL since we can't use env vars in Netlify free tier
    'process.env.VITE_API_URL': JSON.stringify('https://card-calculator.onrender.com')
  }
})