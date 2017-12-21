'use strict';

(function () {
  var LOWEST_PRICE = 10000;
  var HIGHEST_PRICE = 50000;
  /*  var filtersForm = document.querySelector('.map__filters');
  var housingType = filtersForm.querySelector('#housing-type');
  var housingPrice = filtersForm.querySelector('#housing-price');
  var housingRooms = filtersForm.querySelector('#housing-rooms');
  var housingGuests = filtersForm.querySelector('#housing-guests');
  var housingFeatures = filtersForm.querySelector('#housing-features');*/

  window.filterChange = {
    filterAdType: function (arrAds, val) {
      var typeChoice = arrAds.filter(function (it) {
        return it.offer.type === val;
      });
      return typeChoice;
    },
    filterAdPrice: function (arrAds, val) {
      var priceRangeChoice = arrAds.filter(function (it) {
        if (val === LOWEST_PRICE || val === HIGHEST_PRICE) {
          return it.offer.price === val;
        } else if (val > LOWEST_PRICE || val < HIGHEST_PRICE) {
          return it.offer.price === val;
        }
        return it.offer.price === val;
      });
      return priceRangeChoice;
    },
    filterAdRoom: function (arrAds, val) {
      var roomsChoice = arrAds.filter(function (it) {
        return it.offer.rooms >= val;
      });
      return roomsChoice;
    },
    filterAdGuests: function (arrAds, val) {
      var guestsChoice = arrAds.filter(function (it) {
        return it.offer.guests === val;
      });
      return guestsChoice;
    },
    filterAdFeatures: function () {}
  };
})();
