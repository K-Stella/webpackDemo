var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 这是package.json 中 dependencies下的
const VENOR = [
  "faker",
  "lodash",
  "react",
  "react-dom",
  "react-input-range",
  "react-redux",
  "react-router",
  "redux",
  "redux-form",
  "redux-thunk"
]

module.exports = {
  // entry 支持多文件入口
  entry: {
    // bundle和venor是自定义的，会映射到[name]中
    bundle : './src/index.js',
    vendor : VENOR
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // [chunkhash]会根据文件是否改动而更换哈希
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      // mainfest文件是将每次打包都会更改的东西单独提取出来
      // 保证没有更改的文件无需重新打包，这也可以加快打包速度
      name: ['vendor','mainfest'],
      // 配置mainfest文件使用
      minChunks: Infinity
    }),
    new CleanWebpackPlugin(['dist/*.js'],{
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
};
