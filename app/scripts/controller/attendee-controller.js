'use strict';

(function(module) {

  var attendeePoll = document.getElementById('schedule-selector');
  attendeePoll.addEventListener('submit', attendeeView.createAttendee);

})(window);
