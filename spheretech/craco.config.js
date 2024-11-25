const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (config) => {
      config.resolve.fallback = {
        process: require.resolve("process/browser"),
        buffer: require.resolve("buffer/"),
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util/"),
        https: require.resolve("https-browserify"),
        http: require.resolve("stream-http"),
        zlib: require.resolve("browserify-zlib"),
        url: require.resolve("url/"),
      };

      config.plugins.push(
        new webpack.ProvidePlugin({
          process: "process/browser",
          Buffer: ["buffer", "Buffer"],
        })
      );

      return config;
    },
  },
};
