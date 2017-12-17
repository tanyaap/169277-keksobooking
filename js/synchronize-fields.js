'use strict';

(function () {

  window.synchronize = function (field1, field2, callback) {
    field1.addEventListener('change', function () {
      if (typeof callback === 'function') {
        callback(field1, field2);
      }
    });
  };
})();
