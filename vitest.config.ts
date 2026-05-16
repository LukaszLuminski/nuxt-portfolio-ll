import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    include: [
      'components/**/*.test.ts',
      'features/**/*.test.ts',
      'utils/**/*.test.ts'
    ],
    setupFiles: ['tests/setup/vitest.ts']
  }
})
