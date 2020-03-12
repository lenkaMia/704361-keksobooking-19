'use strict';

(function () {
  var avatar = document.querySelector('.ad-form-header__preview img');
  var housingPicture = document.querySelector('.ad-form__photo');
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var pictureChooser = document.querySelector('.ad-form__input');

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
    var newDiv = createNewDiv();
    var housingImg = document.createElement('img');

    housingImg.width = window.consts.PICTURE_SIZE;
    housingImg.height = window.consts.PICTURE_SIZE;

    newDiv.appendChild(housingImg);
    loadPicture(evt, housingImg);
  };

  var createNewDiv = function () {
    var div = document.createElement('div');
    div.classList.add('ad-form__photo');
    return div;
  };

  var resetPicture = function () {
    avatar.src = 'img/muffin-grey.svg';
    housingPicture.innerHTML = '';
  };

  avatarChooser.addEventListener('change', onAvatarLoad);
  pictureChooser.addEventListener('change', onPictureLoad);

  window.resetPicture = resetPicture;
})();
