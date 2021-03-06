'use strict';

(function () {
  var MIN_PRICE_VARIETY = ['1000', '0', '5000', '10000'];

  var notice = document.querySelector('.notice');
  var noticeForm = notice.querySelector('.notice__form');
  var timein = noticeForm.querySelector('#timein');
  var timeout = noticeForm.querySelector('#timeout');
  var typeSelect = noticeForm.querySelector('#type');
  var priceSelect = noticeForm.querySelector('#price');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacityGuests = noticeForm.querySelector('#capacity');
  var submit = noticeForm.querySelector('.form__submit');

  window.form = {
    onMouseupFormActivate: function () {
      noticeForm.classList.remove('notice__form--disabled');
      var fieldsets = noticeForm.children;
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].removeAttribute('disabled');
      }
    }
  };

  var syncValues = function (field1, field2) {
    field2.value = field1.value;
  };
  window.synchronize(timein, timeout, syncValues);
  window.synchronize(timeout, timein, syncValues);

  var syncMinValues = function (field1, field2) {
    field2.min = MIN_PRICE_VARIETY[field1.options.selectedIndex];
  };
  window.synchronize(typeSelect, priceSelect, syncMinValues);

  function correlateGuestsToRooms() {
    var selectRooms = roomNumber.selectedIndex;
    for (var i = 0; i < capacityGuests.options.length; i++) {
      capacityGuests.options[i].removeAttribute('hidden');
    }
    if (selectRooms === 0) { // 1 комната
      capacityGuests.options[0].setAttribute('hidden', 'hidden');
      capacityGuests.options[1].setAttribute('hidden', 'hidden');
      capacityGuests.options[3].setAttribute('hidden', 'hidden');
    }
    if (selectRooms === 1) { // 2 комнаты
      capacityGuests.options[0].setAttribute('hidden', 'hidden');
      capacityGuests.options[3].setAttribute('hidden', 'hidden');
    }
    if (selectRooms === 2) { // 3 комнаты
      capacityGuests.options[3].setAttribute('hidden', 'hidden');
    }
    if (selectRooms === 3) { // 100 комнат
      capacityGuests.options[0].setAttribute('hidden', 'hidden');
      capacityGuests.options[1].setAttribute('hidden', 'hidden');
      capacityGuests.options[2].setAttribute('hidden', 'hidden');
    }
  }

  var syncValuesGuestsToRooms = function (field1, field2) {
    correlateGuestsToRooms();
    field2.value = field1.value;
  };
  window.synchronize(roomNumber, capacityGuests, syncValuesGuestsToRooms);

  function formValidity(evt) {
    var stopSubmit = false;
    if ((parseInt(priceSelect.value, 10) < MIN_PRICE_VARIETY [typeSelect.selectedIndex])) {
      priceSelect.style.border = '2px solid #ff0000';
      stopSubmit = true;
    } else {
      priceSelect.style.border = '';
    }
    if (roomNumber.selectedIndex === 0) { // 1 комната
      if (capacityGuests.value !== '1') {
        capacityGuests.style.border = '2px solid #ff0000';
        stopSubmit = true;
      } else {
        capacityGuests.style.border = '';
      }
    }
    if (roomNumber.selectedIndex === 1) { // 2 комнаты
      if ((capacityGuests.value === '3') || (capacityGuests.value === '0')) {
        capacityGuests.style.border = '2px solid #ff0000';
        stopSubmit = true;
      } else {
        capacityGuests.style.border = '';
      }
    }
    if (roomNumber.selectedIndex === 2) { // 3 комнаты
      if (capacityGuests.value === '0') {
        capacityGuests.style.border = '2px solid #ff0000';
        stopSubmit = true;
      } else {
        capacityGuests.style.border = '';
      }
    }
    if (roomNumber.selectedIndex === 3) { // 100 комнат
      if (capacityGuests.value !== '0') {
        capacityGuests.style.border = '2px solid #ff0000';
        stopSubmit = true;
      } else {
        capacityGuests.style.border = '';
      }
    }
    if (stopSubmit) {
      evt.preventDefault();
    }
  }
  submit.addEventListener('click', formValidity);

  noticeForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeForm), noticeForm.reset(), window.backend.errorHandler);
    evt.preventDefault();
  });
})();
