const { renderImages } = require('renditioner');

const sources = 'resources/img/**/*.*';
const renditions = [
  {
    width: 2560,
  },
  {
    width: 1920,
  },
  {
    width: 1280,
  },
  {
    width: 640,
  },
  {
    width: 320,
  },
  {
    width: 60,
  },
];
renderImages({ sources, fileTypes: ['jpeg'], renditions, basedir: "resources/img/", target: "target/resources/img/" });