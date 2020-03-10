'use strict';

(function () {
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

  var toggleDisabledElements = function (blocks) {
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].disabled = !blocks[i].disabled;
    }
  };

  window.utils = {
    getAvatarSrc: getAvatarSrc,
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement,
    getRandomLengthArray: getRandomLengthArray,
    toggleDisabledElements: toggleDisabledElements
  };
})();
