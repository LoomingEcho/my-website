const clHelper = require("../helper");

module.exports = function (data) {
  const selector = clHelper.getComponentName(data);
  const compName = clHelper.getTsName(data);
  return `import { Component } from "@kluntje/core";

export class ${compName} extends Component {
  constructor() {
    super({
      ui: {
        input: ".${selector}__input",
        label: ".${selector}__label",
      },
      events: [
        {
          event: "keyup",
          target: "input",
          handler: "handleInputChange",
        },
      ],
    });
  }

  handleInputChange(): void {
    this.classList.toggle(".vic-e-test__input--not-empty", this.ui.input.value.length !== 0);
  }
}

customElements.define("${selector}", ${compName});
`;
};
