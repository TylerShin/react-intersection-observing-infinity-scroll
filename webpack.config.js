const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./example/example.tsx",
  mode: "production",
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
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "example")
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "example/index.ejs",
      inject: true,
      NODE_ENV: "development"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "lib"),
    compress: true,
    hot: true,
    port: 9000
  }
};
