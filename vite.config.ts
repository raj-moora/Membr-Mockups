import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Membr-Mockups/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'node',
    server: {
      deps: {
        inline: ['@material/material-color-utilities'],
      },
    },
  },
})
