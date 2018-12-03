import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import autoExternal from 'rollup-plugin-auto-external';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/index.tsx',
  output: {
    file: 'lib/validation.js',
    format: 'cjs',
    name: 'validation',
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