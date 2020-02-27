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
      var pin = window.pins.generatePin(advertisment);

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
    mapFilters.insertAdjacentElement('beforebegin', window.card.generateCard(adsAmount));

    var popupClose = document.querySelector('.popup__close');

    popupClose.addEventListener('click', onCloseBtnClick);
    document.addEventListener('keydown', onCardEscPress);
  };

  var getCoords = function () {
    return {
      x: parseInt(mapPinMain.style.left, 10) + Math.round(window.consts.PIN_MAIN_WIDTH / 2),
      y: map.classList.contains('map--faded') ? parseInt(mapPinMain.style.top, 10) + Math.round(window.consts.PIN_MAIN_HEIGHT / 2) : parseInt(mapPinMain.style.top, 10) + Math.round(window.consts.PIN_MAIN_HEIGHT)
    };
  };

  var onPinClick = function () {
    window.form.activatePage();

    mapPinMain.removeEventListener('mousedown', onPinClick);
  };

  var onPinEnterPress = function (evt) {
    if (evt.key === window.consts.ENTER_KEY) {
      window.form.activatePage();
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
    renderPins: renderPins,
    getCoords: getCoords,

  };

})();
