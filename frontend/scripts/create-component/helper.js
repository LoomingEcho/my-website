const mkdirp = require("mkdirp");
const fs = require("fs-extra");
const chalk = require("chalk");
const { resolve, dirname } = require("path");

const clHelper = {
  getComponentName: answers => {
    const eVSm = answers.atomicType === "Atom" ? "e" : "m";
    return `vic-${eVSm}-${clHelper.getKebabCase(answers.componentName)}`;
  },

  getTsName: answers => {
    return (
      "VIC" +
      answers.componentName
        .split(" ")
        .map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join("")
    );
  },

  getPageName: answers => {
    return answers.componentName
      .split(" ")
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  },

  getPageFileName: answers => {
    return clHelper.getKebabCase(answers.componentName);
  },

  getKebabCase: componentName => {
    return componentName
      .toLowerCase()
      .trim()
      .replace(/ +(?= )/g, "")
      .split(" ")
      .join("-");
  },

  generateFile: (path, contents, cb) => {
    if (fs.existsSync(path)) {
      const errMessage = `The file ${path} already exists! Therefore no new file is created!`;
      return cb(path, errMessage);
    } else {
      clHelper.writeFile(path, contents, cb);
    }
  },

  writeFile: (path, contents, cb) => {
    mkdirp(dirname(path))
      .then(() => fs.writeFile(path, contents, cb(path)))
      .catch(err => {
        if (err) {
          const errMessage = `The file ${path} couldn't be created :(, ${err}`;
          return cb(path, errMessage);
        }
      });
  },

  handleWriteFileCB: (path, err) => {
    if (err) {
      return console.log(chalk.red("X"), err);
    }

    console.log(chalk.green("✓" + path) + " was generated!");
  },

  getFilePath: (componentName, fileType) => {
    return resolve(`./src/components/${componentName}/${componentName}.${fileType}`);
  },

  getGalenPath: (componentName, fileType) => {
    return resolve(`./src/components/${componentName}/specs/galen/${componentName}.${fileType}`);
  },

  getKarmaPath: (componentName, fileType) => {
    return resolve(`./src/components/${componentName}/specs/unit/${componentName}.${fileType}`);
  },

  getPagePath: pageName => {
    return resolve(`./src/pages/${pageName}.hbs`);
  },

  getImportString: (data, fileType) => {
    const componentName = clHelper.getComponentName(data);
    if (fileType === "scss") {
      return `@import "../components/${componentName}/${componentName}";\n`;
    } else if (fileType === "ts") {
      return `import "Components/${componentName}/${componentName}";\n`;
    } else if (fileType === "spec.js") {
      return `import "Components/${componentName}/specs/unit/${componentName}.spec.js";\n`;
    } else {
      return `<a href="pages/${clHelper.getPageFileName(data)}.html" class="page-list-item">${clHelper.getPageName(
        data,
      )}</a>`;
    }
  },

  addImport: (path, data, type) => {
    const importString = clHelper.getImportString(data, type);

    clHelper.checkForImport(path, importString).then(fileExits => {
      if (fileExits) {
        return console.log(`${chalk.red("X")} ${type} import is already added ;)`);
      }

      if (type === "hbs") {
        clHelper.appendPageLink(path, importString).then(() => {
          console.log(`${chalk.green("✓")} Page import was added!`);
        });
      }

      fs.appendFile(path, `\n${importString}`, err => {
        if (err) {
          return console.log(`${chalk.red("X")} ${type} import couldn't be added :( `, err);
        }

        console.log(`${chalk.green("✓")} ${type} import was added!`);
      });
    });
  },

  checkForImport: (path, importString) => {
    console.log("path: ", path);
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) reject(err);

        resolve(data.indexOf(importString) >= 0);
      });
    });
  },

  appendPageLink: (path, importString) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, "utf8", (err, data) => {
        if (err) reject(err);
        const result = data.replace(/<!-- LINK_PLACEHOLDER -->/g, importString + "\n<!-- LINK_PLACEHOLDER -->");
        fs.writeFile(path, result, "utf8", err => {
          if (err) reject(err);
          resolve();
        });
      });
    });
  },
};

module.exports = clHelper;
