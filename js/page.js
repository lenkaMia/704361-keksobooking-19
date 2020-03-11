'use strict';

(function () {

  var activatePage = function () {
    window.map.activate();
    window.form.activate();
    window.filter.activate();
    window.request.load(
        onSuccess,
        window.message.showError);
    window.filter.setFilter(window.debounce(function () {
      updatePins();
    }));
    window.form.setAddress(window.map.getCoords());
  };

  var deactivatePage = function () {
    window.form.deactivate();
    window.map.deactivate();
    window.filter.deactivate();
    window.form.setAddress(window.map.getCoords());
  };

  var advertisments = [];

  var updatePins = function () {
    var filteredAds = window.filter.filterData(advertisments).slice(0, window.consts.PINS_QTY);
    window.map.renderPins(filteredAds);
  };

  var onSuccess = function (ads) {
    advertisments = ads;
    updatePins();
  };

  window.form.setAddress(window.map.getCoords());

  window.page = {
    activate: activatePage,
    deactivate: deactivatePage
  };
})();
