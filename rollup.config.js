import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/solar-overview-card.ts',
  output: {
    file: 'dist/solar-overview-card.js',
    format: 'es',
  },
  plugins: [
    resolve(),
    typescript(),
    terser(),
  ],
};
