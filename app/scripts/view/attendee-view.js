'use strict';

(function(module) {
  var attendeeView = {};

  attendeeView.createAttendee = function() {
    console.log('Button was clicked');
    event.preventDefault();
    let attendeeName = event.target.attendeeName.value;

    let attendeeAvailability = [];

    // Demo app is currently hard-coded for 5 options, but anticipating future capability to create polls with more or fewer options.
    for (var i = 2; i < event.target.length - 1; i++) {
      console.log(`Option ${i - 1}`, event.target[i], event.target[i].checked);
      attendeeAvailability.push(event.target[i].checked);
    };

    console.log(attendeeName);
    console.log(attendeeAvailability);

    // var newAttendee = new Attendee(attendeeName, attendeeAvailability);
  };

  module.attendeeView = attendeeView;

})(window);
