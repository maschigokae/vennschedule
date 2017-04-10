'use strict';

(function(module) {
  var attendeeView = {};

  attendeeView.appendAttendee = function(attendeeData) {
    let scheduleTable = document.getElementById('schedule-results');
    let tableRow = document.createElement('tr');
    let tableCell = document.createElement('td');

    scheduleTable.appendChild(tableRow);
    tableRow.appendChild(tableCell);
    tableCell.innerHTML = `<button id="attendee-id-${attendeeData.id}">Edit</button><span>${attendeeData.name}</span>`;
    var editAttendee = document.getElementById(`attendee-id-${attendeeData.id}`);
    editAttendee.addEventListener('click', attendeeView.editAttendee);

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

  attendeeView.calculatePollTotals = function(opts) {
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

  attendeeView.renderAttendees = function() {

    console.log('Attendee view - all attendees', Attendee.all);

    Attendee.all.forEach( attendee => {
      console.log('Attendee view - each attendee', attendee);
      attendeeView.appendAttendee(attendee);
      attendeeView.calculatePollTotals(attendee.availability);
    });
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

    console.log('new attendee:', JSON.stringify(newAttendee));

    Attendee.postAttendee(newAttendee);
    attendeeView.resetInputs();
  };

  attendeeView.editAttendee = function() {
    let editMode = event.target.parentElement.parentElement;
    console.log('Nodes to edit', editMode.childNodes.length);
    let editName = event.target.nextSibling.textContent;

    editMode.classList.add('edit-mode');
    editMode.insertAdjacentHTML('beforebegin', `<div><form id="${event.target.id}-form"></form></div>`);

    let editForm = document.getElementById(`${event.target.id}-form`);
    console.log(editForm);
    let fieldset = document.createElement('fieldset');
    let div = document.createElement('div');

    editForm.appendChild(fieldset);
    fieldset.appendChild(div);
    div.innerHTML = `<input name="attendeeName" type="text" value="${editName}" autofocus required id="submit-${event.target.id}">`;

    for (var i = 1; i < editMode.childNodes.length; i++) {
      console.log('Nodes to edit', editMode.childNodes[i]);

      let repeatingDiv = document.createElement('div');
      fieldset.appendChild(repeatingDiv);

      let checkboxChecked = editMode.childNodes[i].classList.contains('attend-true');
      repeatingDiv.innerHTML = checkboxChecked ? `<input type="checkbox" checked class="schedule-option" id="option${i}">` : `<input type="checkbox" class="schedule-option" id="option${i}">`;
    };

    let submitButton = document.createElement('div');
    fieldset.appendChild(submitButton);
    submitButton.innerHTML = '<input class="btn-primary" type="submit" value="Submit">';

    let formID = document.getElementById(`${event.target.id}-form`);
    formID.addEventListener('submit', attendeeView.updateAttendee);
  };

  attendeeView.updateAttendee = function() {
    console.log('updating in progress!');

    event.preventDefault();

    let idToUpdate = parseInt(event.target.id.replace(/[^0-9\.]/g, ''), 10);
    let updatedAttendeeName = event.target.attendeeName.value;
    let updatedAttendeeAvailability = [];

    for (var i = 2; i < event.target.length - 1; i++) {
      updatedAttendeeAvailability.push({
        [`option${i - 1}`] : event.target[i].checked
      });
    };

    console.log(updatedAttendeeName, updatedAttendeeAvailability);

    var updatedAttendee = new Attendee({
      name: updatedAttendeeName,
      availability: updatedAttendeeAvailability
    });

    Attendee.editAttendeeData(idToUpdate, updatedAttendee);



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
