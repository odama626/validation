import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import autoExternal from 'rollup-plugin-auto-external';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/index.tsx',
  output: {
    file: 'lib/validateme.js',
    format: 'cjs',
    name: 'validateme',
    sourceMap: 'true'
  },
  external: ['react', 'react-dom'],
  plugins: [
    resolve({jsnext: true}),
    resolve({customResolveOptions: { moduleDirectory: 'node_modules'}}),
    commonjs(),
    autoExternal(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNext'
        }
      }
    }),
    // uglify()
  ]
}