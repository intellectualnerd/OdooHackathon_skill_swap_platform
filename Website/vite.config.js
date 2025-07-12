// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://script.google.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/macros/s'),
        secure:true
      }
    }
  }
})

// https://script.google.com/macros/s/AKfycbwA5g6-x-oNRkh9ASxfqMe5vrhQ1Sqcx3yom6lP5D3huO08LTXQyDJKijSHApWBCNxQ/exec

// https://script.google.com/macros/s/AKfycbwP97Y1iUQInLPNZhddaojHxL1_SRfRgFVQZAAOjMxtoOjBHPHPSEKf0NP1TNuAMQlfQg/exec