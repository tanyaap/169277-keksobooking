'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housingType = filtersForm.querySelector('.housing-type');
  var housingPrice = filtersForm.querySelector('.housing-price');
  var housingRooms = filtersForm.querySelector('.housing-rooms');
  var housingGuests = filtersForm.querySelector('.housing-guests');
  var housingFeatures = filtersForm.querySelector('.housing-features');

  window.getRank = function (pin) {
    var rank = 0;
    if (pin.type === housingType) {
      rank += 5;
    }
    if (pin.price === housingPrice) {
      rank += 4;
    }
    if (pin.rooms === housingRooms) {
      rank += 3;
    }
    if (pin.guests === housingGuests) {
      rank += 2;
    }
    if (pin.features === housingFeatures) {
      rank += 1;
    }
    return rank;
  };

  var pinChange = {
    onTypeChange: function () {},
    onPriceChange: function () {},
    onRoomChange: function () {},
    onGuestsChange: function () {},
    onFeaturesChange: function () {}
  };

  filtersForm.addEventListener('click', function () {
    var filterChange = window.pin.renderPins(window.map.adsSet);
    filtersForm.querySelector('.map__filter').option = filterChange;
    filtersForm.querySelector('.map__filter').input = filterChange;
    pinChange.onTypeChange(filtersForm);
  });

  window.pinChange = pinChange;
  return pinChange;
})();
