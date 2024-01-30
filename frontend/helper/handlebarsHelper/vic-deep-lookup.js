module.exports["vic-deep-lookup"] = (context, dataRef, options) => {
  const propArray = dataRef.replace(/(\[|\])/g, "").split(".");
  let current = context;
  let i = 0;

  while (i < propArray.length && current) {
    current = options.lookupProperty(current, propArray[i]);
    i++;
  }

  if (current !== null) {
    return current;
  }

  return null;
};
