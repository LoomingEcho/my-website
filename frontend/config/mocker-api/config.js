const fs = require("fs");
const path = require("path");
const delay = require("mocker-api/lib/delay");

const DELAY_TIME = 1000;

const proxy = {
  // "GET /api/newswall/:offset/:size": (...args) => {
  //   const newswallHandler = require("../../src/components/vic-m-newswall/vic-m-newswall__api-mock.js");
  //   return newswallHandler(...args);
  // },
  "GET /api/configuration": (req, res) => {
    return res.json({
      b2cHomepageUrl: "/pages/homepage.html",
      b2bHomepageUrl: "/pages/homepage.html?b2b",
      i18n: {
        "viessmann.corporate.targetGroupSwitch.closing.label": "Close Overlay",
        "viessmann.corporate.targetGroupSwitch.b2c.headline": "Do you want to switch to Professionals Mode?",
        "viessmann.corporate.targetGroupSwitch.b2c.text": "Switching to Professional Mode adds additional sections and information for contractors, engineers and architects.",
        "viessmann.corporate.targetGroupSwitch.b2c.switchAndStayCta.label": "Switch and stay on this page",
        "viessmann.corporate.targetGroupSwitch.b2c.switchAndGoCta.label": "Switch and go to Home page",
        "viessmann.corporate.targetGroupSwitch.b2c.stayCta.label": "Stay in Homeowners Mode",
        "viessmann.corporate.targetGroupSwitch.b2b.headline": "Do you want to switch to Homeowners Mode?",
        "viessmann.corporate.targetGroupSwitch.b2b.text": "Switching to Homeowners Mode removes additional sections and information for contractors, engineers and architects.",
        "viessmann.corporate.targetGroupSwitch.b2b.switchAndStayCta.label": "Switch and stay on this page",
        "viessmann.corporate.targetGroupSwitch.b2b.switchAndGoCta.label": "Switch and go to Home page",
        "viessmann.corporate.targetGroupSwitch.b2b.stayCta.label": "Stay in Professional Mode",
        "viessmann.corporate.catalogue.item.button.label": "Learn More",
        "viessmann.corporate.catalogue.title": "Product Catalogue"
      }
    });
  },
  "GET /api/:component*": (req, res) => {
    let { component } = req.params;
    // maps mock urls like "/api/component/a/b" to filenames "component/component__api-mock.a.b.json"
    let suffix = "";
    if (component && component.indexOf("/") > -1) {
      const segments = component.split("/");
      component = segments.shift();
      suffix = segments.map(segment => `.${segment}`).join("");
    }

    const filePath = path.resolve(`./src/components/${component}/${component}__api-mock${suffix}.json`);
    const mockExists = fs.existsSync(path.resolve(filePath));
    if (!mockExists) return res.status(404).send(`Mock file not found for: ${filePath}`);
    delete require.cache[require.resolve(filePath)];
    return res.json(require(filePath));
  },
};
module.exports = delay(proxy, DELAY_TIME);
