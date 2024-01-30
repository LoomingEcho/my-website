const clHelper = require("../helper");

module.exports = function (data) {
  const pageName = clHelper.getPageName(data);
  return `---
title: ${pageName}
layout: page
---

<div class="vic-page-content">
</div>
`;
};
