const clHelper = require("../helper");

module.exports = function (data) {
  return `.${clHelper.getComponentName(data)} {

}
`;
};
