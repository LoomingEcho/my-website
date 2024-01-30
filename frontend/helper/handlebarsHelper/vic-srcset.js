const getDummyRendition = (width, aspectRatio = "16:9", bgColor = "ff3e17") => {
  return `https://satyr.io/${width}x${aspectRatio}/${bgColor} ${width}w`;
};

const getRendition = (imagePath, width, aspectRatio, bgColor, fileType) => {
  if (imagePath === "dummy") return getDummyRendition(width, aspectRatio, bgColor);
  return `${imagePath}__${width}.${fileType} ${width}w`;
}

module.exports["vic-srcset"] = function(imagePath, aspectRatio = "16:9", bgColor = "ff3e17", fileType = "jpeg", _) {
  if (typeof bgColor === "object") bgColor = "ff3e17";
  if (typeof fileType === "object") fileType = "jpeg";
  const mobileSources = getRendition(imagePath, 320, aspectRatio, bgColor, fileType);
  const tabletSources = getRendition(imagePath, 640, aspectRatio, bgColor, fileType);
  const desktopSources = getRendition(imagePath, 1280, aspectRatio, bgColor, fileType);
  const fullWidthSources = getRendition(imagePath, 1920, aspectRatio, bgColor, fileType);
  const fullWidthRetinaSources = getRendition(imagePath, 2560, aspectRatio, bgColor, fileType);
  const srcset = [mobileSources, tabletSources, desktopSources, fullWidthSources, fullWidthRetinaSources];
  return srcset.join(', ');
};
