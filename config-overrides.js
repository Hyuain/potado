const {override, fixBabelImports, addLessLoader, addWebpackAlias} = require('customize-cra');
const path = require('path')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#c9485b',
      '@link-color': '#c9485b'
    },
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  })
);