'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var mapFilters = map.querySelector('.map__filters-container');

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
    return {
      x: parseInt(mapPinMain.style.left, 10) + Math.round(window.consts.PIN_MAIN_WIDTH / 2),
      y: map.classList.contains('map--faded') ? parseInt(mapPinMain.style.top, 10) + Math.round(window.consts.PIN_MAIN_HEIGHT / 2) : parseInt(mapPinMain.style.top, 10) + Math.round(window.consts.PIN_MAIN_HEIGHT)
    };
  };

  var getNewCoords = function (newCoords) {
    var mapWidth = parseInt(map.offsetWidth, 10);

    return {
      x: getCoords.x > mapWidth || getCoords.x < 0 ? mapPinMain.offsetLeft : newCoords.x,
      y: getCoords.y < window.data.LOCATION_MIN_Y || getCoords.y > window.data.LOCATION_MAX_Y ? mapPinMain.offsetTop : newCoords.y
    };
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
  };

  var onPinClick = function (evt) {
    evt.preventDefault();

    if (evt.which === 1) {
      if (map.classList.contains('map--faded')) {
        window.page.activate();
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
          x: mapPinMain.offsetTop - shift.y,
          y: mapPinMain.offsetLeft - shift.x
        };

        var newPinPosition = getNewCoords(movedPinCoords);

        mapPinMain.style.top = (newPinPosition.x) + 'px';
        mapPinMain.style.left = (newPinPosition.y) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    mapPinMain.removeEventListener('mousedown', onPinClick);
  };

  var onPinEnterPress = function (evt) {
    if (evt.key === window.consts.ENTER_KEY) {
      window.page.activate();
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
    renderPins: renderPins,
    getCoords: getCoords
  };

})();
