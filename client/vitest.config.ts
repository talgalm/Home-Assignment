import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts', 'src/**/*.test.ts'], // adjust to your test file locations
    environment: 'jsdom', // or 'node' depending on your tests
  },
})