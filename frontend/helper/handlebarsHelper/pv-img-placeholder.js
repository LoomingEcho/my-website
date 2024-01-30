module.exports["pv-img-placeholder"] = function(width, aspectRatio = "16:9", color = "ff3e17", _) {
  if (typeof color === "object") color = "ff3e17";
  return `https://satyr.dev/${width}x${aspectRatio}/${color}`;
};
