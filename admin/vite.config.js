import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  build: {
    watch: false
    // {
    //   // https://rollupjs.org/guide/en/#watch-options
    // }
  }
})