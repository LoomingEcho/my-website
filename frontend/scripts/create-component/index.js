"use strict";

const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const clHelper = require("./helper");
const scssTpl = require("./templates/scssTemplate");
const mdTpl = require("./templates/mdTemplate");
const hbsTpl = require("./templates/hbsTemplate");
const pageTpl = require("./templates/pageTemplate");
const tsTpl = require("./templates/tsTemplate");
const jestTpl = require("./templates/jestTemplate");
const { resolve } = require("path");

const MAIN_SCSS_PATH = resolve(`./src/styles/index.scss`);
const MAIN_PAGES_PATH = resolve(`./src/styleguide/index.html`);
const MAIN_TS_PATH = resolve(`src/js/components/index.ts`);

console.log(chalk.blue(figlet.textSync("Create Component", { horizontalLayout: "full" })));

inquirer
  .prompt([
    {
      type: "input",
      message: "Enter Component-Name!",
      name: "componentName",
      validate: componentName => {
        if (componentName.match(/(^[a-zA-Z0-9 ]+$)/g)) {
          return true;
        }

        return "Please enter only letters and spaces";
      },
      filter: function (compName) {
        // " Related Topics " -> "related topics"
        // @TODO: check for camelCase
        return compName.trim().replace(/ +(?= )/g, "");
      },
    },
    {
      type: "list",
      name: "atomicType",
      message: "atomic type?",
      choices: ["Atom", "Molecule", "Organism", "Page"],
    },
    {
      type: "confirm",
      name: "hasTs",
      message: "has TS?",
      default: true,
      when: answers => {
        return answers.atomicType !== "Page";
      },
    },
  ])
  .then(answers => {
    console.log("Answers: " + JSON.stringify(answers));

    if (answers.atomicType !== "Page") {
      const componentName = clHelper.getComponentName(answers);

      // Generate scss File
      clHelper.generateFile(clHelper.getFilePath(componentName, "scss"), scssTpl(answers), (path, err) =>
        clHelper.handleWriteFileCB(path, err),
      );

      // Generate md File
      clHelper.generateFile(clHelper.getFilePath(componentName, "md"), mdTpl(answers), (path, err) =>
        clHelper.handleWriteFileCB(path, err),
      );

      // Generate hbs File
      clHelper.generateFile(clHelper.getFilePath(componentName, "hbs"), hbsTpl(answers), (path, err) =>
        clHelper.handleWriteFileCB(path, err),
      );

      if (answers.hasTs) {
        // Generate js File
        clHelper.generateFile(clHelper.getFilePath(componentName, "ts"), tsTpl(answers), (path, err) =>
          clHelper.handleWriteFileCB(path, err),
        );

        // Import scss File
        clHelper.addImport(MAIN_TS_PATH, answers, "ts");

        // Unit test
        clHelper.generateFile(clHelper.getKarmaPath(componentName, "spec.ts"), jestTpl(answers), (path, err) =>
          clHelper.handleWriteFileCB(path, err),
        );
      }

      // Import scss File
      clHelper.addImport(MAIN_SCSS_PATH, answers, "scss");
    } else {
      // Generate page hbs File
      clHelper.generateFile(clHelper.getPagePath(clHelper.getPageFileName(answers)), pageTpl(answers), (path, err) =>
        clHelper.handleWriteFileCB(path, err),
      );

      clHelper.addImport(MAIN_PAGES_PATH, answers, "hbs");
    }
  });
