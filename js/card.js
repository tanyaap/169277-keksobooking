'use strict';

(function () {
  window.card = {
    popupOneAd: function (popup, oneAd) {
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
      var popupFeatures = popup.querySelector('.popup__features');
      var popupFeaturesList = popupFeatures.querySelectorAll('li');
      for (var i = 0; i < popupFeaturesList.length; i++) {
        popupFeatures.removeChild(popupFeaturesList[i]);
      }
      for (i = 0; i < oneAd.offer.features.length; i++) {
        var li = document.createElement('li');
        li.classList.add('feature');
        li.classList.add('feature--' + oneAd.offer.features[i]);
        popupFeatures.appendChild(li);
      }
      popup.querySelector('ul + p').textContent = oneAd.offer.description;
      popup.querySelector('.popup__avatar').src = oneAd.author.avatar;
    },

    showCard: function (elementToClick, elementToShow, callback) {
      if (typeof callback === 'function') {
        callback();
      }
    }
  };
})();
