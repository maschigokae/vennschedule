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

    ajaxGetAllRequest.onload = function() {
      if (ajaxGetAllRequest.status === 200) {
        var attendeeData = JSON.parse(ajaxGetAllRequest.responseText);
        console.log('Initial parsed Attendee Data from server:', attendeeData);

        console.log('Attendee Object Keys', Object.keys(attendeeData));

        let attendeeKey = Object.keys(attendeeData);

        for (var i = 0; i < attendeeKey.length; i++) {
          console.log('Each Attendee Object:', attendeeData[attendeeKey[i]]);
          Attendee.all.push(attendeeData[attendeeKey[i]]);
        }
        console.log('Array of Attendee Objects:', Attendee.all);
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
