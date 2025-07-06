import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shadcn/components': path.resolve(__dirname, 'src/components'),
      '@shadcn/lib': path.resolve(__dirname, 'src/lib'),
      '@shadcn/hooks': path.resolve(__dirname, 'src/hooks'),
      '@shadcn/components/ui': path.resolve(__dirname, 'src/components/ui'),
    },
  },
  server: {
    // host: '192.168.69.84',
    // open: true,
    // historyApiFallback: true,
  }
})
