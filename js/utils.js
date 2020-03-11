'use strict';

(function () {
  var toggleDisabledElements = function (blocks, isItTrue) {
    blocks.forEach(function (item) {
      item.disabled = isItTrue;
    });
  };

  window.toggleDisabledElements = toggleDisabledElements;

})();
