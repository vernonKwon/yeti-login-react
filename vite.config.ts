// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite'
// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react-swc'
// eslint-disable-next-line import/no-extraneous-dependencies
import sass from 'sass'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
  },

  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
})
