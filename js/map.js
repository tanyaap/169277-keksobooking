'use strict';

var AVATARS = [1, 2, 3, 4, 5, 6, 7, 8];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

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
  var randomItemInRange = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomItemInRange;
}

function getFeatures(arr) {
  var oneAdFeatures = [];
  var randomLength = getRandomItemInRange(0, arr.length);
  for (var i = 0; i < randomLength; i++) {
    oneAdFeatures[i] = getUniqueRandomElement(arr);
  }
  return oneAdFeatures;
}

var adsSet = [];

for (var i = 0; i < 8; i++) {
  var adsX = getRandomItemInRange(300, 900);
  var adsY = getRandomItemInRange(100, 500);
  var oneSet = {
    'author': {
      'avatar': 'img/avatars/user' + '0' + getUniqueRandomElement(AVATARS) + '.png',
    },
    'offer': {
      'title': getUniqueRandomElement(TITLES),
      'address': adsX + ', ' + adsY,
      'price': getRandomItemInRange(1000, 1000000),
      'type': getRandomElement(TYPES),
      'rooms': getRandomItemInRange(1, 5),
      'guests': getRandomItemInRange(1, 30),
      'checkin': getRandomElement(CHECKINS),
      'checkout': getRandomElement(CHECKOUTS),
      'features': getFeatures(FEATURES),
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

var map = document.querySelector('.map');
var pin = '';

function makeOnePin(onePin) {
  pin = document.createElement('button');
  pin.className = 'map__pin hidden';
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

var mapPins = map.querySelector('.map__pins');

function renderPins() {
  var fragmentPin = document.createDocumentFragment();
  for (i = 0; i < adsSet.length; i++) {
    fragmentPin.appendChild(makeOnePin(adsSet[i]));
  }
  mapPins.appendChild(fragmentPin);
}
renderPins();

var adTemplate = document.querySelector('template').content;
var adFromSet = adTemplate.cloneNode(true);

function popupOneAd(oneAd) {
  adFromSet.querySelector('h3').textContent = oneAd.offer.title;
  adFromSet.querySelector('article p').textContent = oneAd.offer.address;
  adFromSet.querySelector('.popup__price').textContent = oneAd.offer.price + ' \u20bd / ночь';
  var typeRu = '';
  if (oneAd.offer.type === 'flat') {
    typeRu = 'Квартира';
  } else if (oneAd.offer.type === 'bungalo') {
    typeRu = 'Бунгало';
  } else {
    typeRu = 'Дом';
  }
  adFromSet.querySelector('h4').textContent = typeRu;
  adFromSet.querySelector('h4 + p').textContent = oneAd.offer.rooms + ' для ' + oneAd.offer.guests + ' гостей';
  adFromSet.querySelectorAll('article p')[3].textContent = 'Заезд после ' + oneAd.offer.checkin + ', ' + 'выезд до ' + oneAd.offer.checkout;
  adFromSet.querySelector('.popup__features').textContent = oneAd.offer.features;
  adFromSet.querySelector('ul + p').textContent = oneAd.offer.description;
  adFromSet.querySelector('.popup__avatar').src = oneAd.author.avatar;
}
popupOneAd(adsSet[0]);

var mapFiltersContainer = map.querySelector('.map__filters-container');
map.insertBefore(adFromSet, mapFiltersContainer);

var mapPinMain = map.querySelector('.map__pin--main');
var mapPinForm = map.querySelector('.map__filters');
var housingType = mapPinForm.querySelector('#housing-type');
var housingPrice = mapPinForm.querySelector('#housing-price');
var housingRooms = mapPinForm.querySelector('#housing-rooms');
var housingGuests = mapPinForm.querySelector('#housing-guests');
var features = mapPinForm.querySelector('.features');
var popup = adTemplate.querySelector('.popup');
var popupClose = popup.querySelector('.popup__close');

function onMouseupActivate() {
  map.classList.remove('map--faded');
  mapPinForm.classList.remove('notice__form--disabled');
  housingType.removeAttribute('disabled');
  housingPrice.removeAttribute('disabled');
  housingRooms.removeAttribute('disabled');
  housingGuests.removeAttribute('disabled');
  features.removeAttribute('disabled');
  pin.classList.remove('hidden'); // один пин все время есть на экране (и во время блокировки) на одном и том же месте, после снятия блокировки отображается еще один пин и все
}
mapPinMain.addEventListener('mouseup', onMouseupActivate);

function openPopup() {
  pin.classList.add('map__pin--active');
  popup.classList.remove('hidden'); // не срабатывает, я добавила hidden в размтку template, может, по-другому надо было убрать показ по умолчанию?
}

function onClickOpenPopup() {
  openPopup();
}
pin.addEventListener('click', onClickOpenPopup);

pin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

var clickedPin = pin;
function clickHandler(evt) {
  if (clickedPin) {
    pin.classList.remove('map__pin--active');
  }
  clickedPin = evt.currentTarget;
  clickedPin(onClickOpenPopup);
}
pin.addEventListener('click', clickHandler);

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onClickClosePopup();
  }
}

function closePopup() {
  popup.classList.add('hidden');
  pin.classList.remove('map__pin--active');
  document.removeEventListener('keydown', onPopupEscPress);
}

function onClickClosePopup() {
  closePopup();
}
popupClose.addEventListener('click', onClickClosePopup);

popupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    popup.classList.add('hidden');
    pin.classList.remove('map__pin--active');
  }
});

popup.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    popup.classList.add('hidden');
    pin.classList.remove('map__pin--active');
  }
});
