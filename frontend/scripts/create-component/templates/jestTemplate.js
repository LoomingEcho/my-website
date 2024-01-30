const clHelper = require("../helper");

module.exports = function (data) {
  const selector = clHelper.getComponentName(data);
  const compName = clHelper.getTsName(data);

  const compVarName = compName.charAt(0).toLowerCase() + compName.slice(1);

  return `import { ${compName} } from "Components/${selector}/${selector}";

describe("${compName} tests:", () => {
  const ${compVarName} = new ${compName}();

  describe("onComponentInitialized method:", () => {
    beforeEach(() => {
      spyOn(${compVarName}, "dispatchEvent");
      spyOn(window, "CustomEvent");
      ${compVarName}.onComponentInitialized();
    });

    test("should create custom kl-component-initialized event", () => {
      expect(window.CustomEvent).toBeCalledWith("kl-component-initialized");
    });

    test("should dispatch created event", () => {
      expect(${compVarName}.dispatchEvent).toBeCalledWith(expect.any(CustomEvent));
    });
  });
});
`;
};
