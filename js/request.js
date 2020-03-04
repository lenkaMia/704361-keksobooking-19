'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT_IN_MS = 10000;

  var Errors = {
    400: 'Неверный запрос',
    401: 'Пользователь не авторизован',
    404: 'Ничего не найдено'
  };

  var setupLoad = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === window.consts.SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + Errors[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = setupLoad(onLoad, onError);

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var onError = function (errorMessage) {
    var errorTemplate = document.querySelector('#error')
        .content
        .querySelector('.error');
    var error = errorTemplate.cloneNode(true);

    error.querySelector('.error__message').textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', error);
  };

  window.request = {
    load: load,
    onError: onError,
    URL_LOAD: URL_LOAD
  };
})();
