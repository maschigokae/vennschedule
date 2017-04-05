'use strict';

(function(module) {
  var attendeeView = {};

  var appendAttendee = function(attendeeData) {
    // 'p' elements to be replaced with more approprate elements, using for now to demo js functionality
    let attendeeTemplate = `<p class="attendee-name">${attendeeData.name}</p>`;

    let scheduleTable = document.getElementById('schedule-table');
    scheduleTable.insertAdjacentHTML('beforebegin', attendeeTemplate);

    attendeeData.availability.forEach( (opt, index) => {
      let optKey = `option${index + 1}`;
      console.log('template', opt[optKey]);

      // 'p' elements to be replaced with more approprate elements, using for now to demo js functionality
      let availabilityTemplate = `<p class="attend-${opt[optKey]}">Can Attend? ${opt[optKey] ? 'Yes' : 'No'}</p>`;
      console.log(availabilityTemplate);

      let scheduleTable = document.getElementById('schedule-table');
      scheduleTable.insertAdjacentHTML('beforebegin', availabilityTemplate);
    });
  };

  attendeeView.createAttendee = function() {
    console.log('Button was clicked');
    event.preventDefault();
    let attendeeName = event.target.attendeeName.value;

    let attendeeAvailability = [];

    // Demo app is currently hard-coded for 5 options, but anticipating future capability to create polls with more or fewer options.
    for (var i = 2; i < event.target.length - 1; i++) {
      console.log(`Option ${i - 1}`, event.target[i], event.target[i].checked);
      attendeeAvailability.push({
        [`option${i - 1}`] : event.target[i].checked
      });
    };

    console.log(attendeeName);
    console.log(attendeeAvailability);

    var newAttendee = new Attendee({
      name: attendeeName,
      availability: attendeeAvailability
    });

    Attendee.all.push(newAttendee);
    console.log(newAttendee);
    console.log(Attendee.all);

    appendAttendee(newAttendee);
  };

  module.attendeeView = attendeeView;

})(window);
