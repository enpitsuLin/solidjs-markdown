import { defineConfig } from 'vitest/config'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  test: {
    deps: {
      registerNodeLoader: true,
      inline: [/solid-js/],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['node_modules/@testing-library/jest-dom/extend-expect', './setupVitest.js'],
    transformMode: { web: [/\.[jt]sx?$/] },
    coverage: {
      provider: 'c8',
      reporter: ['json', 'json-summary', 'text'],
    },
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
})
