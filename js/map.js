'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var mapFilters = map.querySelector('.map__filters-container');
  var LOCATION_MIN_Y = 130;
  var LOCATION_MAX_Y = 630;

  var closeCard = function () {
    var card = map.querySelector('.map__card');

    if (card) {
      card.remove();

      document.removeEventListener('keydown', onCardEscPress);
    }
  };

  var renderPins = function (advertisments) {
    var fragment = document.createDocumentFragment();

    advertisments.forEach(function (advertisment) {
      var pin = window.generatePin(advertisment);

      pin.addEventListener('click', function () {
        openCard(advertisment);
      });

      pin.addEventListener('keydown', function (evt) {
        if (evt.key === window.consts.ENTER_KEY) {
          openCard(advertisment);
        }
      });

      fragment.appendChild(pin);
    });
    mapPins.appendChild(fragment);
  };

  var renderCard = function (adsAmount) {
    var card = window.generateCard(adsAmount);
    mapFilters.insertAdjacentElement('beforebegin', card);

    var popupClose = card.querySelector('.popup__close');

    popupClose.addEventListener('click', onCloseBtnClick);
    document.addEventListener('keydown', onCardEscPress);
  };

  var getCoords = function () {
    var position = {
      x: parseInt(mapPinMain.style.left, 10),
      y: parseInt(mapPinMain.style.top, 10)
    };
    return calculateNewCoords(position);
  };

  var calculateNewCoords = function (position) {
    return {
      x: position.x + Math.round(window.consts.PIN_MAIN_WIDTH / 2),
      y: map.classList.contains('map--faded') ? position.y + Math.round(window.consts.PIN_MAIN_HEIGHT / 2) : position.y + Math.round(window.consts.PIN_MAIN_HEIGHT) + window.consts.PIN_TAIL
    };
  };

  var getPosition = function (newCoords) {
    var mapWidth = parseInt(map.offsetWidth, 10);
    var coords = calculateNewCoords(newCoords);

    return {
      x: coords.x > mapWidth || coords.x < 0 ? mapPinMain.offsetLeft : newCoords.x,
      y: coords.y < LOCATION_MIN_Y || coords.y > LOCATION_MAX_Y ? mapPinMain.offsetTop : newCoords.y
    };
  };

  var removePins = function () {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
    removePins();
  };

  var onPinClick = function (evt) {
    evt.preventDefault();

    if (evt.which === 1) {
      if (map.classList.contains('map--faded')) {
        window.activatePage();
      }

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var movedPinCoords = {
          x: mapPinMain.offsetLeft - shift.x,
          y: mapPinMain.offsetTop - shift.y
        };

        var newPinPosition = getPosition(movedPinCoords);

        mapPinMain.style.top = (newPinPosition.y) + 'px';
        mapPinMain.style.left = (newPinPosition.x) + 'px';

        window.form.setAddress(getCoords());
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  var onPinEnterPress = function (evt) {
    if (evt.key === window.consts.ENTER_KEY) {
      window.activatePage();
      mapPinMain.removeEventListener('keydown', onPinEnterPress);
    }
  };

  var onCardEscPress = function (evt) {
    if (evt.key === window.consts.ESC_KEY) {
      closeCard();
    }
  };

  var onCloseBtnClick = function () {
    closeCard();
  };

  var openCard = function (ad) {
    closeCard();
    renderCard(ad);
  };

  mapPinMain.addEventListener('mousedown', onPinClick);
  mapPinMain.addEventListener('keydown', onPinEnterPress);

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    renderPins: renderPins,
    getCoords: getCoords
  };

})();
