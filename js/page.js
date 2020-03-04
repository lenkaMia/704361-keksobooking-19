'use strict';

(function () {
  // var ADS_QTY = 8;
  // var ads = window.generate(ADS_QTY);

  var activatePage = function () {
    window.request.load(
        function (data) {
          window.map.activate();
          window.form.activate();
          window.map.renderPins(data);
          window.form.setAddress(window.map.getCoords());
        },
        window.request.onError);
  };

  window.form.deactivate();
  window.map.deactivate();

  window.form.setAddress(window.map.getCoords());

  window.activatePage = activatePage;

})();
