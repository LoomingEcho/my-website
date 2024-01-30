const path = require("path");
const mockerAPI = require("mocker-api");

module.exports = {
  devServer: {
    before(app) {
      mockerAPI(app, path.resolve("./config/mocker-api/config.js"), {
        changeHost: true,
        header: {
          'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, Authorization, metadata, Ocp-Apim-Subscription-Key',
        }
      });
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
