import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@mui/material", "@emotion/styled", "@mui/icons-material", "@mui/styled-engine"],
  },
  ssr: {
    noExternal: ["@mui/material", "@emotion/styled", "@mui/icons-material", "@mui/styled-engine"],
  }
})
