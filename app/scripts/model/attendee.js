'use strict';

(function(module) {
  function Attendee(opts) {
    Object.keys(opts).forEach( (each, index, keys) => {
      this[each] = opts[each];
    }, this);
  };

  Attendee.all = [];

  module.Attendee = Attendee;
})(window);
