module.exports["vic-if-then"] = function (condition, returnValue) {
  if (condition) return returnValue;
  return undefined;
};