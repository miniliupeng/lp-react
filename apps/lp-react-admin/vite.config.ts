import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { join } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@lp-react\/(.+)$/,
        replacement: join(__dirname, '..', '..', 'packages', '$1', 'src')
      }
    ]
  }
})
