const clHelper = require("../helper");

module.exports = function (data) {
  const componentName = clHelper.getComponentName(data);

  const htmlImport = "```" + componentName + ":" + componentName + ".html" + "\n```";

  return `---
name: ${data.componentName}
category: ${data.atomicType}s
---

Descriptive Text goes here.

${htmlImport}
`;
};
