'use strict';

(function () {
  // var ADS_QTY = 5;
  // var ads = window.generate(ADS_QTY);

  var activatePage = function () {
    window.map.activate();
    window.form.activate();
    window.request.load(
        window.map.onSuccess,
        window.message.showError);
    window.form.setAddress(window.map.getCoords());
  };

  var deactivatePage = function () {
    window.form.deactivate();
    window.map.deactivate();
    window.form.setAddress(window.map.getCoords());
  };


  window.form.setAddress(window.map.getCoords());

  window.page = {
    activate: activatePage,
    deactivate: deactivatePage
  };
})();
