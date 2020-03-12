'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adSubmit = adForm.querySelector('.ad-form__submit');
  var formReset = adForm.querySelector('.ad-form__reset');
  var roomNumber = adForm.querySelector('#room_number');
  var capacityValue = adForm.querySelector('#capacity');
  var adFormAddress = adForm.querySelector('#address');
  var formElements = adForm.querySelectorAll('fieldset');
  var housingTypes = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var checkInTime = adForm.querySelector('#timein');
  var checkOutTime = adForm.querySelector('#timeout');
  var adTime = adForm.querySelector('.ad-form__element--time');
  var adTitle = adForm.querySelector('#title');
  var avatarChooser = adForm.querySelector('.ad-form-header__input');
  var pictureChooser = adForm.querySelector('.ad-form__input');

  var setMinPrice = function () {
    var currentHousingType = housingTypes.value;
    switch (currentHousingType) {
      case 'palace':
        priceInput.min = 10000;
        priceInput.placeholder = 10000;
        break;
      case 'flat':
        priceInput.min = 1000;
        priceInput.placeholder = 1000;
        break;
      case 'bungalo':
        priceInput.min = 0;
        priceInput.placeholder = 0;
        break;
      case 'house':
        priceInput.min = 5000;
        priceInput.placeholder = 5000;
        break;
    }
  };

  var setTime = function (type, time) {
    var input = type === 'timein' ? checkOutTime : checkInTime;
    input.value = time;
  };

  adTime.addEventListener('change', function (evt) {
    setTime(evt.target.name, evt.target.value);
  });

  var setAddress = function (coords) {
    adFormAddress.value = coords.x + ' , ' + coords.y;
  };

  var checkRoomsCapacity = function (rooms, capacity) {
    if (rooms === '1' && capacity === '1') {
      roomNumber.setCustomValidity('');
    } else if (rooms === '2' && (capacity < '3' && capacity > '0')) {
      roomNumber.setCustomValidity('');
    } else if (rooms === '3' && (capacity <= '3' && capacity > '0')) {
      roomNumber.setCustomValidity('');
    } else if (rooms === '100' && capacity === '0') {
      roomNumber.setCustomValidity('');
    } else {
      roomNumber.setCustomValidity('Не верное количество комнат или гостей');
    }
  };

  adSubmit.addEventListener('click', function () {
    checkRoomsCapacity(roomNumber.value, capacityValue.value);
  });

  adTitle.addEventListener('invalid', function () {
    if (adTitle.validity.tooShort) {
      adTitle.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else if (adTitle.validity.tooLong) {
      adTitle.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (adTitle.validity.valueMissing) {
      adTitle.setCustomValidity('Обязательное текстовое поле');
    } else {
      adTitle.setCustomValidity('');
    }
  });

  window.toggleDisabledElements(formElements, true);
  setAddress(window.map.getCoords());

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    avatarChooser.addEventListener('change', window.picture.onAvatarLoad);
    pictureChooser.addEventListener('change', window.picture.onPictureLoad);
    adForm.addEventListener('submit', onFormSubmit);
    formReset.addEventListener('click', onResetClick);
    window.toggleDisabledElements(formElements, false);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();

    window.request.save(new FormData(adForm),
        function () {
          window.page.deactivate();
          window.message.showSuccess();
        }, window.message.showError);
  };

  var deactivateForm = function () {
    adForm.classList.add('ad-form--disabled');

    adForm.reset();
    window.picture.resetPicture();
    window.toggleDisabledElements(formElements, true);

    avatarChooser.removeEventListener('change', window.picture.onAvatarLoad);
    pictureChooser.removeEventListener('change', window.picture.onPictureLoad);
    adForm.removeEventListener('submit', onFormSubmit);
    formReset.removeEventListener('click', onResetClick);
  };

  var onResetClick = function () {
    window.page.deactivate();
  };

  housingTypes.addEventListener('change', function () {
    setMinPrice();
  });

  window.form = {
    activate: activateForm,
    deactivate: deactivateForm,
    setAddress: setAddress,
  };
})();
