'use strict';

(function () {
  var avatar = document.querySelector('.ad-form-header__preview img');
  var housingPicture = document.querySelector('.ad-form__photo');

  var loadPicture = function (evt, picture) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.consts.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        picture.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onAvatarLoad = function (evt) {
    loadPicture(evt, avatar);
  };

  var onPictureLoad = function (evt) {
    var housingImg = document.createElement('img');

    housingImg.width = window.consts.PICTURE_SIZE;
    housingImg.height = window.consts.PICTURE_SIZE;

    housingPicture.appendChild(housingImg);

    loadPicture(evt, housingImg);
  };

  var resetPicture = function () {
    avatar.src = 'img/muffin-grey.svg';
    housingPicture.innerHTML = '';
  };

  window.picture = {
    onAvatarLoad: onAvatarLoad,
    onPictureLoad: onPictureLoad,
    resetPicture: resetPicture
  };
})();
