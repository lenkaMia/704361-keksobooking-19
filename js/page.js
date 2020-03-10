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
      onFilterChange();
    }));
    window.form.setAddress(window.map.getCoords());
  };

  var deactivatePage = function () {
    window.form.deactivate();
    window.map.deactivate();
    window.filter.deactivate();
    window.form.setAddress(window.map.getCoords());
  };

  var onSuccess = function (ads) {
    var filteredAds = window.filter.filterData(ads).slice(0, window.consts.PINS_QTY);
    window.map.renderPins(filteredAds);
  };

  var onFilterChange = function (data) {
    var filteredData = window.filter.filterData(data);
    window.map.renderPins(filteredData);
  };

  window.form.setAddress(window.map.getCoords());

  window.page = {
    activate: activatePage,
    deactivate: deactivatePage
  };
})();
