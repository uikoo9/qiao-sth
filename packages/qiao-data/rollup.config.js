/**
 * rollup.config.js
 */
module.exports = {
  input: 'src/index.js',
  output: {
    file: 'index.js',
    format: 'cjs',
  },
  external: ['qiao.cookie.js', 'qiao.ls.js', 'qiao.log.js', 'uuid'],
};
