'use strict';

(function () {
  var AVATARS = [1, 2, 3, 4, 5, 6, 7, 8];
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['flat', 'house', 'bungalo'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.data = {
    getRandomElement: function (arr) {
      var arrRandomItem = Math.floor(Math.random() * arr.length);
      return arr[arrRandomItem];
    },
    getUniqueRandomElement: function (arr) {
      var uniqueRandomItem = Math.floor(Math.random() * arr.length);
      var randomItem = arr[uniqueRandomItem];
      arr.splice(uniqueRandomItem, 1);
      return randomItem;
    },
    getRandomItemInRange: function (min, max) {
      var randomItemInRange = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomItemInRange;
    },
    getFeatures: function (arr) {
      var oneAdFeatures = [];
      var randomLength = window.data.getRandomItemInRange(0, arr.length);
      for (var i = 0; i < randomLength; i++) {
        oneAdFeatures[i] = window.data.getUniqueRandomElement(arr);
      }
      return oneAdFeatures;
    },
    getSet: function () { // ошибка возникает тут из-за того, что этот блок записан в функцию(?)
      var adsSet = [];
      for (var i = 0; i < 8; i++) {
        var adsX = window.data.getRandomItemInRange(300, 900);
        var adsY = window.data.getRandomItemInRange(100, 500);
        var oneSet = {
          'id': i,
          'author': {
            'avatar': 'img/avatars/user' + '0' + window.data.getUniqueRandomElement(AVATARS) + '.png',
          },
          'offer': {
            'title': window.data.getUniqueRandomElement(TITLES),
            'address': adsX + ', ' + adsY,
            'price': window.data.getRandomItemInRange(1000, 1000000),
            'type': window.data.getRandomElement(TYPES),
            'rooms': window.data.getRandomItemInRange(1, 5),
            'guests': window.data.getRandomItemInRange(1, 30),
            'checkin': window.data.getRandomElement(CHECKINS),
            'checkout': window.data.getRandomElement(CHECKOUTS),
            'features': window.data.getFeatures(FEATURES),
            'description': '',
            'photos': [],
          },
          'location': {
            'x': adsX,
            'y': adsY,
          }
        };
        adsSet[i] = oneSet;
      }
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };
})();
