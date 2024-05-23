// commonjs
const { rollupPluginCommonjs } = require('qiao-project');

// node
const { rollupPluginNodeResolve } = require('qiao-project');

// terser
const terser = require('@rollup/plugin-terser');

/**
 * rollup.config.js
 */
module.exports = [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/pm.js',
      format: 'iife',
    },
    plugins: [rollupPluginCommonjs(), rollupPluginNodeResolve(), terser()],
  },
];
