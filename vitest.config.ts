import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('.', import.meta.url))
    }
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    include: [
      'components/**/*.test.ts',
      'composables/**/*.test.ts',
      'features/**/*.test.ts',
      'server/**/*.test.ts',
      'utils/**/*.test.ts'
    ],
    setupFiles: ['tests/setup/vitest.ts']
  }
})
