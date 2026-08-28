import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relativo: funziona su GitHub Pages qualunque sia il nome del repository
// (https://<utente>.github.io/<repo>/) senza doverlo configurare qui.
export default defineConfig({
  base: './',
  plugins: [react()],
})
