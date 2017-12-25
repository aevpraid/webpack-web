const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Create multiple instances CSS
const extractCSS = new ExtractTextPlugin('../css/[name].css');
const extractLESS = new ExtractTextPlugin({
  filename: './css/[name].css',
});

module.exports = {
  entry: {
    main: './src/js/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /(node_modules|bower_components|public)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['stage-0','env'],
          }
        }
      },
      {
        test: /\.css$/,
        use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
      },
      {
        test: /\.less$/,
        use: extractLESS.extract([ 'css-loader', 'less-loader' ])
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '../img/'
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    extractCSS,
    extractLESS,
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
};