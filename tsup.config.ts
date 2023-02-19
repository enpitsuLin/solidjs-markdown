import { defineConfig } from 'tsup-preset-solid'

export default defineConfig(
  {
    entry: 'src/index.tsx',
  },
  {
    dropConsole: true,
    esbuildOptions: (options) => {
      options.sourcemap = true
    },
  }
)
