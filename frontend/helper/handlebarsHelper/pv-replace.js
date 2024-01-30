module.exports["pv-replace"] = function(text, searchString, replaceString) {
  return text.split(searchString).join(replaceString);
};
