const fs = require("fs");

function getTypeVar(typeData, namespace) {
  const regExp = RegExp(`\n${namespace}\\S*`, "gm");
  const typeVar = typeData.match(regExp) || [""];

  return typeVar[0].split("\n").join("");
}

function getPlaceholderWordCount(typeData) {
  const placeholderWordCount = typeData.match(/(?<=\/\/\sPlaceholder-Word-Count:\s)\d*/gm) || ["25"];
  return parseInt(placeholderWordCount, 10);
}

function getPlaceholderTag(typeData) {
  return typeData.match(/(?<=\/\/\sPlaceholder-Tag:\s)\S*/gm) || ["p"];
}

function getPlaceholderText(typeData) {
  return typeData.match(/(?<=\/\/\sPlaceholder-Text:\s).*/gm);
}

function getTypeName(typeVar, namespace) {
  return  typeVar.split(namespace).join("");
}

function getTypeOptions(typeData, namespace) {
  const typeVar = getTypeVar(typeData, namespace);
  return {
    var: typeVar,
    name: getTypeName(typeVar, namespace),
    placeholderWordCount: getPlaceholderWordCount(typeData),
    placeholderTag: getPlaceholderTag(typeData),
    placeholderText: getPlaceholderText(typeData),
  };
}

module.exports["pv-typos"] = function (path, namespace, _, opt) {
  const data = fs.readFileSync(path, {
    encoding: "utf-8",
  });
  
  const typoData = data
    .split("// LSG-Typography-Type")
    .filter((group) => group !== "")
    .filter((group) => group.startsWith(`\n${namespace}`) || group.startsWith(`\n// Placeholder-Word-Count:`) || group.startsWith(`\n// Placeholder-Tag:`) || group.startsWith(`\n// Placeholder-Text:`));

  const typoOptions = typoData.map(typeDate => getTypeOptions(typeDate, namespace));

  let results = "";
  typoOptions.forEach((item) => {
    results += opt.fn(item);
  });
  return results;
};