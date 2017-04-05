'use strict';

(function(module) {
  var attendeeView = {};

  var appendAttendee = function(attendeeData) {
    let scheduleTable = document.getElementById('schedule-results');
    let tableRow = document.createElement('tr');
    let tableCell = document.createElement('td');

    scheduleTable.appendChild(tableRow);
    tableRow.appendChild(tableCell);
    tableCell.innerHTML = attendeeData.name;

    attendeeData.availability.forEach( (opt, index) => {
      let optKey = `option${index + 1}`;
      let repeatingTableCell = document.createElement('td');

      repeatingTableCell.classList.add('schedule-result', `attend-${opt[optKey]}`);

      let availabilityTemplate = `Can Attend? ${opt[optKey] ? 'Yes' : 'No'}`;

      repeatingTableCell.innerHTML = availabilityTemplate;
      tableRow.appendChild(repeatingTableCell);
      console.log(availabilityTemplate);

    });

    if (document.getElementsByClassName('schedule-result').length) {
      let scheduleResults = document.getElementById('schedule-headers');
      scheduleResults.style.display = 'table-row';
    }
  };

  attendeeView.createAttendee = function() {
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
