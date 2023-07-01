import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import routerNext from 'vite-router-next'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), routerNext()],
})
