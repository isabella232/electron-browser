const path = require("path");

module.exports = {
  entry: "./src/js/entry",
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "browser-app.js",
    publicPath: `./static/`
  },
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: path.resolve(__dirname, "node_modules")
      }
    ]
  }
}