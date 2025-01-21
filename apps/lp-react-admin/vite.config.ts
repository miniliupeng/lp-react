import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { join } from 'node:path'
import UnoCSS from 'unocss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), UnoCSS()],
  resolve: {
    alias: [
      {
        find: /^@lp-react\/(.+)$/,
        replacement: join(__dirname, '..', '..', 'packages', '$1', 'src')
      }
    ]
  }
})
