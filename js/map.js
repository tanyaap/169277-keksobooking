'use strict';

var AVATARS = [1, 2, 3, 4, 5, 6, 7, 8];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

function getRandomElement(arr) {
  var arrRandomItem = Math.floor(Math.random() * arr.length);
  return arr[arrRandomItem];
}

function getUniqueRandomElement(arr) {
  var uniqueRandomItem = Math.floor(Math.random() * arr.length);
  var randomItem = arr[uniqueRandomItem];
  arr.splice(uniqueRandomItem, 1);
  return randomItem;
}

function getRandomItemInRange(min, max) {
  var randomItemInRange = Math.floor(Math.random(max - min + 1)) + min;
  return randomItemInRange;
}

var oneSet = {
  'author': {
    'avatar': '',
  },
  'offer': {
    'title': '',
    'address': '',
    'price': '',
    'type': '',
    'rooms': '',
    'guests': '',
    'checkin': '',
    'checkout': '',
    'features': '',
    'description': '',
    'photos': '',
  },
  'location': {
    'x': '',
    'y': '',
  }
};

var adsSet = [oneSet, oneSet, oneSet, oneSet, oneSet, oneSet, oneSet, oneSet];

for (var i = 0; i < adsSet.length; i++) {
  adsSet[i].author.avatar = 'img/avatars/user' + '0' + getUniqueRandomElement(AVATARS) + '.png';
  adsSet[i].offer.title = getUniqueRandomElement(TITLES);
  adsSet[i].offer.address = 'location ' + getRandomItemInRange(300, 900) + ', ' + 'location ' + getRandomItemInRange(100, 500);
  adsSet[i].offer.price = getRandomItemInRange(1000, 1000000);
  adsSet[i].offer.type = getRandomElement(TYPES);
  adsSet[i].offer.rooms = getRandomItemInRange(1, 5);
  adsSet[i].offer.guests = getRandomItemInRange(1, 30);
  adsSet[i].offer.checkin = getRandomElement(CHECKINS);
  adsSet[i].offer.checkout = getRandomElement(CHECKOUTS);
  adsSet[i].offer.features = getRandomItemInRange(0, FEATURES.length);
  adsSet[i].offer.description = '';
  adsSet[i].offer.photos = [];
  adsSet[i].location.x = getRandomItemInRange(300, 900);
  adsSet[i].location.y = getRandomItemInRange(100, 500);
}

var map = document.querySelector('.map');
map.classList.remove('.map--faded');

var mapPins = map.querySelector('.map__pins');
var fragmentPin = document.createDocumentFragment();
for (i = 0; i < adsSet.length; i++) {
  var pin = document.createElement('button');
  pin.className = 'map__pin';
  pin.style.left = adsSet[i].location.x + 'px';
  pin.style.top = adsSet[i].location.y + 'px';
  pin.img = adsSet[i].author.avatar;
  pin.img = 'width="40" height="40" draggable="false"';
  fragmentPin.appendChild(pin);
}
mapPins.appendChild(fragmentPin);

var adTemplate = document.querySelector('template').content;

var fragmentAd = document.createDocumentFragment();
for (i = 0; i < adsSet.length; i++) {
  var adFromSet = adTemplate.cloneNode(true);
  adFromSet.querySelector('h3').textContent = adsSet[i].offer.title;
  adFromSet.querySelector('article p').textContent = adsSet[i].offer.address;
  adFromSet.querySelector('.popup__price').innerHTML = adsSet[i].offer.price + '&#x20bd;/ночь';
  if (adsSet[i].offer.type === 'flat') {
    TYPES[i] = 'Квартира';
  } else if (adsSet[i].offer.type === 'bungalo') {
    TYPES[i] = 'Бунгало';
  } else {
    TYPES[i] = 'Дом';
  }
  adFromSet.querySelector('h4').textContent = adsSet[i].offer.type;
  adFromSet.querySelectorAll('article p')[2].textContent = adsSet[i].offer.rooms + ' для ' + adsSet[i].offer.guests;
  adFromSet.querySelectorAll('article p')[3].textContent = 'Заезд после ' + adsSet[i].offer.checkin + ', ' + 'выезд до ' + adsSet[i].offer.checkout;
  adFromSet.querySelector('.popup__features').textContent = adsSet[i].offer.features;
  adFromSet.querySelectorAll('article p')[4].textContent = adsSet[i].offer.description;
  adFromSet.querySelector('.popup__avatar').setAttribute('src', adsSet[i].author.avatar);
  fragmentAd.appendChild(adFromSet);
}
var mapFiltersContainer = map.querySelector('.map__filters-container');
map.insertBefore(fragmentAd, mapFiltersContainer);
