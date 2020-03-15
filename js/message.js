'use strict';

(function () {
  var main = document.querySelector('main');

  var showSuccess = function () {
    var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
    var success = successTemplate.cloneNode(true);

    var removeMessage = function () {
      success.remove();

      success.addEventListener('click', onMessageClick);
      document.removeEventListener('keydown', onMessageEscPress);
    };

    var onMessageClick = function (evt) {
      if (!evt.target.classList.contains('success__message')) {
        removeMessage();
      }
    };

    var onMessageEscPress = function (evt) {
      if (evt.key === window.consts.ESC_KEY) {
        removeMessage();
      }
    };

    success.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onMessageEscPress);

    main.insertAdjacentElement('afterbegin', success);
  };

  var showError = function (errorMessage) {
    var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
    var error = errorTemplate.cloneNode(true);

    var removeMessage = function () {
      error.remove();

      error.addEventListener('click', onMessageClick);
      document.removeEventListener('keydown', onMessageEscPress);
    };

    var onMessageClick = function (evt) {
      if (!evt.target.classList.contains('error__message')) {
        removeMessage();
      }
    };

    var onMessageEscPress = function (evt) {
      if (evt.key === window.consts.ESC_KEY) {
        removeMessage();
      }
    };

    error.querySelector('.error__message').textContent = errorMessage;

    error.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onMessageEscPress);

    main.insertAdjacentElement('afterbegin', error);
  };

  window.message = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
