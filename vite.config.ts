import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
export default defineConfig({
  css: {
    postcss: {
      plugins: [require('autoprefixer')]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    legacy({
      targets: ['defaults', 'last 2 versions', '> 0.1%'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  build: {
    minify: false
  }
})
