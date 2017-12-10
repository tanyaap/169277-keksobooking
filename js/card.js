'use strict';

(function () {
  var adTemplate = document.querySelector('template').content;
  var popup = adTemplate.querySelector('.map__card').cloneNode(true);

  window.card = {
    popupOneAd: function (oneAd) {
      popup.querySelector('h3').textContent = oneAd.offer.title;
      popup.querySelector('article p').textContent = oneAd.offer.address;
      popup.querySelector('.popup__price').textContent = oneAd.offer.price + ' \u20bd / ночь';
      var typeRu = '';
      if (oneAd.offer.type === 'flat') {
        typeRu = 'Квартира';
      } else if (oneAd.offer.type === 'bungalo') {
        typeRu = 'Бунгало';
      } else {
        typeRu = 'Дом';
      }
      popup.querySelector('h4').textContent = typeRu;
      popup.querySelector('h4 + p').textContent = oneAd.offer.rooms + ' для ' + oneAd.offer.guests + ' гостей';
      popup.querySelectorAll('article p')[3].textContent = 'Заезд после ' + oneAd.offer.checkin + ', ' + 'выезд до ' + oneAd.offer.checkout;
      popup.querySelector('.popup__features').textContent = oneAd.offer.features;
      popup.querySelector('ul + p').textContent = oneAd.offer.description;
      popup.querySelector('.popup__avatar').src = oneAd.author.avatar;
    }
  };
})();
