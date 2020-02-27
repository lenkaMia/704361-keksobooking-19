'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  var generateCard = function (ads) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = ads.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ads.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ads.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getTranslatedType(ads);
    cardElement.querySelector('.popup__text--capacity').textContent = ads.offer.rooms + ' комнаты для ' + ads.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = ads.offer.description;
    cardElement.querySelector('.popup__avatar').src = ads.author.avatar;

    generateFeatures(ads.offer.features, cardElement);
    generatePhotos(ads.offer.photos, cardElement);

    return cardElement;
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

  var getTranslatedType = function (ad) {
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

  window.card = {
    generateCard: generateCard
  };

})();
