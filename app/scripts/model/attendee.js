'use strict';

const API_URL = 'http://localhost:8080';

(function(module) {

  function Attendee(opts) {
    Object.keys(opts).forEach( (each, index, keys) => {
      this[each] = opts[each];
    }, this);
  };

  Attendee.all = [];

  Attendee.fetchAllAttendees = function() {
    // vanilla XMLHttpRequest goes here
    var ajaxGetAllRequest = new XMLHttpRequest();
    ajaxGetAllRequest.open('GET', `${API_URL}/api/attendee`, true);

    ajaxGetAllRequest.onload = function(responseData) {
      if (ajaxGetAllRequest.status === 200) {
        var attendeeData = JSON.parse(ajaxGetAllRequest.responseText);
        console.log(attendeeData);
      } else {
        console.log('Sorry, there was an error.');
      }
    };

    ajaxGetAllRequest.onerror = function() {
      // add error handling here
    };

    ajaxGetAllRequest.send();
  };

  module.Attendee = Attendee;
})(window);
