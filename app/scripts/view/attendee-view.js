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
    tableCell.classList.add('attendee-names');

    attendeeData.availability.forEach( (opt, index) => {
      let optKey = `option${index + 1}`;
      let repeatingTableCell = document.createElement('td');

      repeatingTableCell.classList.add('schedule-result', `attend-${opt[optKey]}`, optKey);

      let availabilityTemplate = opt[optKey] ? 'YES' : 'NO';

      repeatingTableCell.innerHTML = availabilityTemplate;
      tableRow.appendChild(repeatingTableCell);
    });

    if (document.getElementsByClassName('schedule-result').length) {
      let scheduleResults = document.getElementById('schedule-headers');
      scheduleResults.style.display = 'table-row';

      let pollTotals = document.getElementById('poll-yes-totals');
      pollTotals.style.display = 'table-row';
    }
  };

  var calculatePollTotals = function(opts) {
    let updatedTotals = [];

    for (var i = 0; i < opts.length; i++) {
      let affirmativeResponses = document.querySelectorAll(`.option${i + 1}.attend-true`);
      let pollTotalCell = document.getElementById(`option-${i + 1}-total`);
      pollTotalCell.innerHTML = affirmativeResponses.length;
      updatedTotals.push(affirmativeResponses.length);
    };

    for (var i = 0; i < opts.length; i++) {
      let affirmativeResponses = document.querySelectorAll(`.option${i + 1}.attend-true`);
      let pollTotalCell = document.getElementById(`option-${i + 1}-total`);

      pollTotalCell.classList.remove('most-yes-responses');

      if (affirmativeResponses.length === Math.max(...updatedTotals)) {
        pollTotalCell.classList.add('most-yes-responses');
      }
    };
  };

  attendeeView.createAttendee = function() {
    event.preventDefault();
    let attendeeName = event.target.attendeeName.value;

    let attendeeAvailability = [];

    // Demo app is currently hard-coded for 5 options, but anticipating future capability to create polls with more or fewer options.
    for (var i = 2; i < event.target.length - 1; i++) {
      attendeeAvailability.push({
        [`option${i - 1}`] : event.target[i].checked
      });
    };

    var newAttendee = new Attendee({
      name: attendeeName,
      availability: attendeeAvailability
    });

    Attendee.all.push(newAttendee);

    appendAttendee(newAttendee);
    calculatePollTotals(newAttendee.availability);
    attendeeView.resetInputs();
  };

  attendeeView.resetInputs = function() {
    let attendeeNameInput = document.getElementById('attendee-name');
    attendeeNameInput.value = '';
    attendeeNameInput.focus();

    let scheduleOptions = document.querySelectorAll('.schedule-option');

    for (var i = 0; i < scheduleOptions.length; i++) {
      scheduleOptions[i].checked = false;
    }
  };

  module.attendeeView = attendeeView;

})(window);
