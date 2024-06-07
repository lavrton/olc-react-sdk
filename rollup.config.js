import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import ts from 'rollup-plugin-ts';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

const PLUGINS = [
  commonjs(),
  ts(),
  nodeResolve(),
  babel({
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
    _VERSION: JSON.stringify(pkg.version),
    preventAssignment: true,
  }),
  postcss(), 
];

export default [
  {
    input: 'src/main.tsx',
    external: ['react', 'react-dom' ,'prop-types', 'polotno'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: PLUGINS,
  },
  // UMD build with inline PropTypes
  {
    input: 'src/main.tsx',
    external: ['react', 'react-dom' ,'prop-types', 'polotno'],
    output: [
      {
        name: 'OLCReact',
        file: pkg.browser,
        format: 'umd',
        globals: {
          react: 'React',
        },
      },
    ],
    plugins: PLUGINS,
  },
  // Minified UMD Build without PropTypes
  {
    input: 'src/main.tsx',
    external: ['react', 'react-dom' ,'prop-types', 'polotno'],
    output: [
      {
        name: 'OLCReact',
        file: pkg['browser:min'],
        format: 'umd',
        globals: {
          react: 'React',
        },
      },
    ],
    plugins: [...PLUGINS, terser()],
  },
];
