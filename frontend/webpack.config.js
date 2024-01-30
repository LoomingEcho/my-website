const path = require("path");
const { resolve } = require("path");
const mockerAPI = require("mocker-api");

module.exports = {
  resolve: {
    alias: {
      Core: resolve("src/js/core"),
      Services: resolve("src/js/services"),
      Constants: resolve("src/js/constants/"),
      Helper: resolve("src/js/helper/"),
      Components: resolve("src/components/"),
      Abstracts: resolve("src/components/abstract/"),
      Interfaces: resolve("src/js/interfaces/"),
      Icons: resolve("resources/icons"),
      Karma: resolve("src/js/karma"),
      Config: resolve("src/js/config"),
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-inline-loader",
            options: {
              removeTags: true,
              removingTags: ["title", "desc"],
            },
          },
        ],
      },
      // workaround to surpress source map warnings in console from files within node_modules
      {
        test: /\.js$/,
        enforce: "pre",
        use: [
          {
            loader: "source-map-loader",
            options: {
              filterSourceMappingUrl: (url, resourcePath) => {
                if (/.*[\\/]node_modules[\\/]@webcomponents[\\/].*/.test(resourcePath)) {
                  return false;
                }
                return true;
              },
            },
          },
        ],
      },
    ],
  },
};
