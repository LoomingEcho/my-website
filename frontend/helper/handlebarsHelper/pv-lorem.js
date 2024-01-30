const { loremIpsum } = require("lorem-ipsum");

module.exports["pv-lorem"] = function(count) {
  const blindText = loremIpsum({
    count,                // Number of "words", "sentences", or "paragraphs"
    format: "plain",         // "plain" or "html"
    units: "words"      // paragraph(s), "sentence(s)", or "word(s)"
  });

  return blindText[0].toUpperCase() + blindText.substring(1)
};
