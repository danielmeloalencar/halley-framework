import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import size from 'rollup-plugin-size'

const plugins = [
  typescript({
    tsconfig: 'tsconfig.json',
    removeComments: true,
    useTsconfigDeclarationDir: true,
  }),
  terser({
    include: ['halley.js'],
  }),
  size()
]

export default {
  input: 'src/index.ts',
  output: [
    { file: 'dist/halley.umd.js', format: 'umd', name: 'halley', sourcemap: true },
    { file: 'dist/halley.js', format: 'esm', sourcemap: true },
    { file: 'dist/halley.esm.js', format: 'esm', sourcemap: true },
  ],
  plugins,
  
}
