const webpack = require("webpack");
const { PvStylemarkPlugin } = require("@pro-vision/pv-stylemark");
const path = require("path");

const PUBLIC_PATH = process.env.PUBLIC_PATH || "/";
const isAEMBuild = process.env.AEM_BUILD === 'true';

const getPlugins = () => {
  const plugins = [
    // This makes it possible for us to safely use env vars on our code
    new webpack.DefinePlugin({
      PUBLIC_PATH: JSON.stringify(PUBLIC_PATH),
    }),
  ];

  if (isAEMBuild === false) plugins.push(new PvStylemarkPlugin());
  return plugins;
}

module.exports = {
  entry: {
    "vic.lsg": [
      path.resolve("src/lsg/main.scss"),
      path.resolve("src/lsg/main.ts")
    ],
  },

  plugins: getPlugins(),
};
