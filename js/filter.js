'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var formMapElements = mapFilters.querySelectorAll('select, fieldset');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var roomPrice = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  var filterData = function (ads) {
    return ads.filter(function (element) {
      return filterHousing(element.offer.type, housingType) &&
      filterHousingPrice(element.offer.price, housingPrice) &&
      filterHousing(element.offer.quests, housingGuests) &&
      filterHousing(element.offer.rooms, housingRooms) &&
      filterHousingFeatures(element.offer.features);
    });
  };

  var filterHousing = function (data, filterElement) {
    return filterElement.value === 'any' ? true : data.toString() === filterElement.value;
  };

  var filterHousingFeatures = function (data) {
    var housingFeatures = mapFilters.querySelectorAll('.map__checkbox:checked');

    return Array.from(housingFeatures).every(function (feature) {
      return data.indexOf(feature.value) >= 0;
    });
  };

  var filterHousingPrice = function (data, filterElement) {
    return filterElement.value === 'any' ? true : roomPrice[filterElement.value].min <= data && data < roomPrice[filterElement.value].max;
  };

  var activateFilters = function () {
    window.toggleDisabledElements(formMapElements, false);
  };

  var deactivateFilters = function () {
    mapFilters.reset();
    window.toggleDisabledElements(formMapElements, true);
  };

  var setFilter = function (cb) {
    mapFilters.addEventListener('change', function () {
      cb();
    });
  };

  window.toggleDisabledElements(formMapElements, true);


  window.filter = {
    activate: activateFilters,
    deactivate: deactivateFilters,
    filterData: filterData,
    setFilter: setFilter
  };
})();
