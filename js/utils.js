'use strict';

(function () {
  var toggleDisabledElements = function (blocks) {
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].disabled = !blocks[i].disabled;
    }
  };

  window.toggleDisabledElements = toggleDisabledElements;

})();
