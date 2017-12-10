'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  function makeOnePin(onePin) {
    var pin = document.createElement('button');
    pin.id = onePin.id;
    pin.className = 'map__pin';
    pin.style.left = onePin.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = onePin.location.y + PIN_HEIGHT + 'px';
    var pinImage = document.createElement('img');
    pinImage.src = onePin.author.avatar;
    pinImage.width = PIN_WIDTH;
    pinImage.height = PIN_HEIGHT;
    pinImage.draggable = false;
    pin.appendChild(pinImage);
    return pin;
  }

  window.pin = {
    renderPins: function () {
      var fragmentPin = document.createDocumentFragment();
      for (var i = 0; i < window.data.getSet.adsSet.length; i++) { // ошибка
        fragmentPin.appendChild(makeOnePin(window.data.getSet.adsSet[i])); // ошибка
      }
      mapPins.appendChild(fragmentPin);
    }
  };
})();
