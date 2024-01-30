let counter = 0;

module.exports["pv-uuid"] = function(prefix) {
  let prefixToUse = "pv-";

  if (typeof prefix === "string") {
    prefixToUse = prefix;
  }

  const uuid = prefixToUse + String(counter);
  counter += 1;

  return uuid;
};
