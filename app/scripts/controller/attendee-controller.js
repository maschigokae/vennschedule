'use strict';

(function(module) {
  Attendee.fetchAllAttendees();

  var attendeePoll = document.getElementById('schedule-selector');
  attendeePoll.addEventListener('submit', attendeeView.createAttendee);

})(window);
