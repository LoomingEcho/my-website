const clHelper = require("../helper");

module.exports = function (data) {
  const tagName = data.hasTs ? clHelper.getComponentName(data) : "div";
  return `---
layout: default
---

<${tagName} class="${clHelper.getComponentName(data)}"></${tagName}>`;
};
