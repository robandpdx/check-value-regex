import path from 'node:path';
import { fileURLToPath } from 'node:url';

import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import license from 'rollup-plugin-license';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  input: 'src/index.ts',
  output: {
    esModule: true,
    file: 'dist/index.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    typescript(),
    nodeResolve({ preferBuiltins: true, extensions: ['.ts', '.js'] }),
    commonjs(),
    license({
      thirdParty: {
        output: path.join(__dirname, 'dist', 'licenses.txt'),
      },
    }),
  ],
};

export default config;
