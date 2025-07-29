import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
 
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setup-test.ts'],
    css: true,
    environmentOptions: {
      jsdom: {
        url: 'http://localhost/', // set a non-opaque origin
      },
    },
  },
})