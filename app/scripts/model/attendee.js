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

        attendeeView.renderAttendees();
      } else {
        console.log('Sorry, there was an error.');
      }
    };

    ajaxGetAllRequest.onerror = function() {
      // add error handling here
    };

    ajaxGetAllRequest.send();
  };

  Attendee.postAttendee = function(data) {
    var ajaxPostRequest = new XMLHttpRequest();
    ajaxPostRequest.open('POST', `${API_URL}/api/attendee`, true);
    ajaxPostRequest.setRequestHeader("Content-Type", "application/json");
    ajaxPostRequest.send(JSON.stringify(data));

    ajaxPostRequest.onload = function() {
      if (ajaxPostRequest.status === 200) {
        var attendeeData = JSON.parse(ajaxPostRequest.responseText);
        console.log('Newly POSTed Attendee Data from server:', attendeeData);
        attendeeView.appendAttendee(attendeeData);
        attendeeView.calculatePollTotals(attendeeData.availability);
      } else {
        console.log('Sorry, there was an error.');
      }
    };

    ajaxPostRequest.onerror = function() {
      // add error handling here
    };
  };

  Attendee.editAttendeeData = function(id, data) {
    var ajaxPutRequest = new XMLHttpRequest();
    ajaxPutRequest.open('PUT', `${API_URL}/api/attendee/${id}`, true);
    ajaxPutRequest.setRequestHeader("Content-Type", "application/json");
    ajaxPutRequest.send(JSON.stringify(data));

    ajaxPutRequest.onload = function() {
      if (ajaxPutRequest.status === 200) {
        var attendeeData = JSON.parse(ajaxPutRequest.responseText);
        console.log('Newly Updated Attendee Data from server:', attendeeData);
        attendeeView.replaceUpdatedAttendee(attendeeData);
        attendeeView.calculatePollTotals(attendeeData.availability);
      } else {
        console.log('Sorry, there was an error.');
      }
    };

    ajaxPutRequest.onerror = function() {
      // add error handling here
    };
  };

  Attendee.deleteAttendeeData = function(id) {
    var ajaxDeleteRequest = new XMLHttpRequest();
    ajaxDeleteRequest.open('DELETE', `${API_URL}/api/attendee/${id}`, true);

    ajaxPostRequest.onerror = function() {
      // add error handling here
    };
  };

  module.Attendee = Attendee;
})(window);
