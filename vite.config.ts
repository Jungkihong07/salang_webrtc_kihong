import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    allowedHosts: [
      '.ngrok-free.app',  // ngrok 무료 도메인 전체 허용
      '.ngrok.io',         // ngrok 유료 도메인
      '.ngrok.app'         // ngrok 추가 도메인
    ]
  }
})
