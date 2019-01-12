/* eslint-disable */
const merge = require('webpack-merge');
const common = require('./webpack.common');
/* eslint-enable */

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    clientLogLevel: 'none',
    historyApiFallback: true,
    port: 3000,
    compress: true,
  },
});
