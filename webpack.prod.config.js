const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "production",
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
    filename: "index.js",
    path: path.resolve(__dirname, "dst")
  }
};
