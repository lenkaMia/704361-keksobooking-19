'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  // var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;

  var errors = {
    400: 'Неверный запрос',
    404: 'Ничего не найдено'
  };

  var setupLoad = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === window.consts.SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + errors[xhr.status]);
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


  window.request = {
    load: load,
  };
})();
