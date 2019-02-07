const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  mode: process.env.NODE_ENV,
  output: {
    path: path.join(__dirname, process.env.NODE_ENV === 'production' ? 'dist' : '.dev'),
    filename: 'index.js'
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    // new webpack.BannerPlugin('require("source-map-support").install();',
    //                          { raw: true, entryOnly: false })
  ],
  // devtool: 'sourcemap'
}