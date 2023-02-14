import withSolid from 'rollup-preset-solid'

export default withSolid({
  input: 'src/index.tsx',
  output: {
    file: 'dist/index.js',
    sourcemap: true,
  },
})
