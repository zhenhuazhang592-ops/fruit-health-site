import { defineConfig } from 'vitest/config'
import path from 'path'

// Global setup for jest-dom matchers
const setupFiles = [`${path.resolve(__dirname, './tests/setup.ts')}`]

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{ts,tsx}'],
    globals: true,
    setupFiles,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})