const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
// const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
// const webpack = require('webpack');
const path = require("path");
module.exports = {
  // input
  entry: "./src/index.js",
  mode: "production",
  // output
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.[hash].js",
  },
  // loader
  module: {
    rules: [{
        test: /\.css$|\.scss$/i,
        use: [MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ],
      },
      {
        test: /\.(gif|png)/,
        type: 'asset/resource'
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      }
    ],
  },
  // plugin
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }), new MiniCssExtractPlugin({
      filename: 'index.[hash].css'
    }),
    new CleanWebpackPlugin(),
    // new CopyPlugin({
    //   patterns: [{
    //     from: "./static",
    //     to: "./static"
    //   }, ],
    // }),
    // new webpack.DefinePlugin({
    //   // Definitions....
    //   PRODUCTION: JSON.stringify(false),
    // }),
    new CompressionPlugin()
  ],
  devtool: 'source-map'
};