'use strict';

(function () {
  var translatedTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };
  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  var generateCard = function (ads) {
    var card = cardTemplate.cloneNode(true);

    card.querySelector('.popup__title').textContent = ads.offer.title;
    card.querySelector('.popup__text--address').textContent = ads.offer.address;
    card.querySelector('.popup__text--price').textContent = ads.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = getTranslatedType(ads);
    card.querySelector('.popup__text--capacity').textContent = ads.offer.rooms + ' комнаты для ' + ads.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
    card.querySelector('.popup__description').textContent = ads.offer.description;
    card.querySelector('.popup__avatar').src = ads.author.avatar;

    generateFeatures(ads.offer.features, card);
    generatePhotos(ads.offer.photos, card);

    return card;
  };

  var generatePhotos = function (photos, card) {
    var popupPhotos = card.querySelector('.popup__photos');
    var popupPhoto = popupPhotos.querySelector('.popup__photo');

    popupPhotos.innerHTML = '';

    photos.forEach(function (photo) {
      var photoItem = popupPhoto.cloneNode(true);

      photoItem.src = photo;

      popupPhotos.appendChild(photoItem);
    });
  };

  var generateFeatures = function (features, card) {
    var popupFeatures = card.querySelector('.popup__features');
    var popupFeature = popupFeatures.querySelector('.popup__feature');

    popupFeatures.innerHTML = '';

    features.forEach(function (feature) {
      var featureItem = popupFeature.cloneNode(true);

      featureItem.className = 'popup__feature popup__feature--' + feature;

      popupFeatures.appendChild(featureItem);
    });
  };

  var getTranslatedType = function (ad) {
    return translatedTypes[ad.offer.type];
  };

  window.generateCard = generateCard;
})();
