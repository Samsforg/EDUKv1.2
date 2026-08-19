"use strict";
module.exports = function () {
  return `"use strict";
if (!("canParse" in URL)) {
  URL.canParse = function (url, base) {
    try {
      return !!new URL(url, base);
    } catch (e) {
      return false;
    }
  };
}`;
};
