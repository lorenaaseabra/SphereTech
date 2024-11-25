const webpack = require("webpack");

module.exports = function override(config) {
  // Adicionar polyfills para módulos Node.js
  config.resolve.fallback = {
    buffer: require.resolve("buffer/"),
    process: require.resolve("process/browser"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    stream: require.resolve("stream-browserify"),
    zlib: require.resolve("browserify-zlib"),
    util: require.resolve("util/"),
    assert: require.resolve("assert/"),
    url: require.resolve("url/"),
  };

  // Adicionar plugins necessários para o Webpack 5
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};
