'use strict';

var ADS_QTY = 8;
var MAX_PRICE = 1000000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 100];
var GUESTS = [0, 1, 2, 3];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var LOCATION_MIN_X = 0;
var LOCATION_MAX_X = 1200;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var PIN_MAIN_WIDTH = 65;
var PIN_MAIN_HEIGHT = 65;
var ENTER_KEY = 'Enter';
var LEFT_BUTTON_MOUSE = 1;
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
var mapPins = map.querySelector('.map__pins');
var mapPinMain = mapPins.querySelector('.map__pin--main');
var mapFilters = map.querySelector('.map__filters-container');
var adForm = document.querySelector('.ad-form');
var formElements = document.querySelectorAll('.map__filter, fieldset');

var getAvatarSrc = function (index) {
  return 'img/avatars/user0' + (index + 1) + '.png';
};

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomLengthArray = function (array) {
  return array.slice(0, Math.floor(Math.random() * array.length) + 1);
};

var generateAdsArray = function (adsQty) {
  var advertisments = [];
  for (var i = 0; i < adsQty; i++) {
    var locationX = getRandomInteger(LOCATION_MIN_X, LOCATION_MAX_X);
    var locationY = getRandomInteger(LOCATION_MIN_Y, LOCATION_MAX_Y);

    var ad = {
      author: {
        avatar: getAvatarSrc(i)
      },

      offer: {
        title: '',
        address: locationX + ', ' + locationY,
        price: getRandomInteger(0, MAX_PRICE),
        type: getRandomElement(TYPES),
        rooms: getRandomElement(ROOMS),
        quests: getRandomElement(GUESTS),
        checkin: getRandomElement(TIMES),
        checkout: getRandomElement(TIMES),
        features: getRandomLengthArray(FEATURES),
        description: '',
        photos: getRandomLengthArray(PHOTOS)
      },

      location: {
        x: locationX,
        y: locationY
      }
    };
    advertisments.push(ad);
  }
  return advertisments;
};

var createPin = function (ad) {
  var adElement = pinTemplate.cloneNode(true);

  adElement.style.left = (ad.location.x - PIN_WIDTH / 2) + 'px';
  adElement.style.top = (ad.location.y - PIN_HEIGHT) + 'px';
  adElement.querySelector('img').src = ad.author.avatar;
  adElement.querySelector('img').alt = ad.offer.title;

  return adElement;
};

var renderPins = function (advertisments) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < advertisments.length; i++) {
    fragment.appendChild(createPin(advertisments[i]));
  }

  mapPins.appendChild(fragment);
};

var generateFeatures = function (features, cardElement) {
  var popupFeatures = cardElement.querySelector('.popup__features');
  var popupFeature = popupFeatures.querySelector('.popup__feature');

  popupFeatures.innerHTML = '';

  for (var i = 0; i < features.length; i++) {
    var featureElement = popupFeature.cloneNode(true);

    featureElement.className = 'popup__feature popup__feature--' + features[i];

    popupFeatures.appendChild(featureElement);
  }
};

var generatePhotos = function (photos, cardElement) {
  var popupPhotos = cardElement.querySelector('.popup__photos');
  var popupPhoto = popupPhotos.querySelector('.popup__photo');

  popupPhotos.innerHTML = '';

  for (var i = 0; i < photos.length; i++) {
    var photoElement = popupPhoto.cloneNode(true);

    photoElement.src = photos[i];

    popupPhotos.appendChild(photoElement);
  }
};

var getTypes = function (ad) {
  switch (ad.offer.type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    default:
      return '';
  }
};

var generateCard = function (ads) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = ads.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ads.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ads.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getTypes(ads);
  cardElement.querySelector('.popup__text--capacity').textContent = ads.offer.rooms + ' комнаты для ' + ads.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = ads.offer.description;
  cardElement.querySelector('.popup__avatar').src = ads.author.avatar;

  generateFeatures(ads.offer.features, cardElement);
  generatePhotos(ads.offer.photos, cardElement);

  return cardElement;
};

var renderCard = function (adsAmount) {
  mapFilters.insertAdjacentElement('beforebegin', generateCard(adsAmount));
};

var toggleDisabledElements = function () {
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = !formElements[i].disabled;
  }
};

var activateMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  toggleDisabledElements();
  var ads = generateAdsArray(ADS_QTY);
  renderPins(ads);
  renderCard(ads[0]);
};

var onPinClick = function (evt) {
  if (evt.which === LEFT_BUTTON_MOUSE) {
    activateMap();
  }
};

var onPinEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    activateMap();
  }
};

mapPinMain.addEventListener('mousedown', onPinClick);
mapPinMain.addEventListener('keydown', onPinEnterPress);
