const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dst")
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.ejs",
      inject: true,
      NODE_ENV: "development"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dst"),
    compress: true,
    hot: true,
    port: 9000
  }
};
