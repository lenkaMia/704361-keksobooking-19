'use strict';

(function () {
  var ADS_QTY = 8;
  var ads = window.data.generate(ADS_QTY);

  var activatePage = function () {
    window.map.activate();
    window.form.activate();
    window.map.renderPins(ads);
    window.form.setAddress(window.map.getCoords());
  };

  window.form.setAddress(window.map.getCoords());

  window.page = {
    activate: activatePage,
  };

})();
