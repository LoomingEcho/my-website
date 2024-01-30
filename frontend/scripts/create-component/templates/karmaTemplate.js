const clHelper = require("../../helper");

module.exports = function(data) {
  const selector = clHelper.getComponentName(data);
  const compName = clHelper.getTsName(data);
  return `import unitHelper from 'Karma/helper';

describe("${compName} tests:", function() {
  beforeEach(function() {
    this.el = unitHelper.initTest(fixture, '${selector}');
  });

  afterEach(function() {
    fixture.cleanup();
  });

  describe("renderingTemplate method:", function() {
    it("should return valid alt on image", function() {
      
    });
  });  
});  
`;
};
