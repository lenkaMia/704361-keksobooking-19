'use strict';

var ADS_QTY = 8;
var MAX_PRICE = 10000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 100];
var GUESTS = [0, 1, 2, 3];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN = {
  MIN_X: 0,
  MAX_X: 1200,
  MIN_Y: 130,
  MAX_Y: 630
};
var advertisment = [];

var map = document.querySelector('.map');

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
  return array.slice(0, Math.ceil(Math.random() * array.length));
};

var generateAdsArray = function (adsQty) {
  for (var i = 0; i < adsQty; i++) {
    var locationX = getRandomInteger(PIN.MIN_X, PIN.MAX_X);
    var locationY = getRandomInteger(PIN.MIN_Y, PIN.MAX_Y);

    var ads = {
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

    advertisment.push(ads);
  }
};

generateAdsArray(ADS_QTY);

map.classList.remove('map--faded');
