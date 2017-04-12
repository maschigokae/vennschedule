'use strict';

(function(module) {
  var attendeeView = {};

  attendeeView.appendAttendee = function(attendeeData) {
    let scheduleTable = document.getElementById('schedule-results');
    let tableRow = document.createElement('tr');
    let tableCell = document.createElement('td');

    scheduleTable.appendChild(tableRow);
    tableRow.appendChild(tableCell);
    tableCell.innerHTML = `<button id="attendee-id-${attendeeData.id}" class="btn-dynamic">Edit</button><span>${attendeeData.name}</span>`;
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

  attendeeView.replaceUpdatedAttendee = function(updatedAttendeeData) {
    let updatedAttendeeRecord = document.getElementById(`attendee-id-${updatedAttendeeData.id}`).parentElement;
    updatedAttendeeRecord.lastChild.textContent = updatedAttendeeData.name;

    let updatedAvailabilityNodes = updatedAttendeeRecord.parentElement.childNodes;

    for (var i = 0; i < updatedAvailabilityNodes.length - 1; i++) {
      let nodeToUpdate = updatedAvailabilityNodes[i + 1];
      let updatedAvailability = updatedAttendeeData.availability[i][`option${i + 1}`];

      let makeAvailable = function() {
        nodeToUpdate.classList.remove('attend-false');
        nodeToUpdate.classList.add('attend-true');
        nodeToUpdate.textContent = 'YES';
      };

      let makeUnavailable = function() {
        nodeToUpdate.classList.remove('attend-true');
        nodeToUpdate.classList.add('attend-false');
        nodeToUpdate.textContent = 'NO';
      };

      updatedAvailability ? makeAvailable() : makeUnavailable();

    };

    attendeeView.calculatePollTotals(updatedAttendeeData.availability);

    let editForm = document.getElementById(`attendee-id-${updatedAttendeeData.id}-form`);
    editForm.remove();

    let editModeNodes = document.getElementsByClassName('edit-mode');

    for (var i = 0; i < editModeNodes.length; i++) {
      editModeNodes[i].classList.remove('edit-mode');
    };
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
    Attendee.all.forEach( attendee => {
      attendeeView.appendAttendee(attendee);
      attendeeView.calculatePollTotals(attendee.availability);
    });
  };

  attendeeView.createAttendee = function(event) {
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

    Attendee.postAttendee(newAttendee);
    attendeeView.resetInputs();
  };

  attendeeView.editAttendee = function(event) {
    let editMode = event.target.parentElement.parentElement;
    let editName = event.target.nextSibling.textContent;
    let attendeeIdToEdit = event.target.id;

    editMode.classList.add('edit-mode');
    editMode.insertAdjacentHTML('beforebegin', `<tr><td><form id="${event.target.id}-form"></form></tr></td>`);

    let editForm = document.getElementById(`${event.target.id}-form`);
    let fieldset = document.createElement('fieldset');
    let div = document.createElement('div');

    editForm.appendChild(fieldset);
    fieldset.appendChild(div);
    div.innerHTML = `<input name="attendeeName" type="text" value="${editName}" autofocus required id="submit-${event.target.id}">`;

    for (var i = 1; i < editMode.childNodes.length; i++) {
      let repeatingDiv = document.createElement('div');
      fieldset.appendChild(repeatingDiv);

      let checkboxChecked = editMode.childNodes[i].classList.contains('attend-true');
      repeatingDiv.innerHTML = checkboxChecked ? `<input type="checkbox" checked class="edit-schedule-option" id="${event.target.id}-option${i}">` : `<input type="checkbox" class="edit-schedule-option" id="${event.target.id}-option${i}">`;
    };

    let submitButton = document.createElement('div');
    fieldset.appendChild(submitButton);
    submitButton.innerHTML = '<input class="btn-dynamic" type="submit" value="Submit">';

    let formID = document.getElementById(`${event.target.id}-form`);
    formID.addEventListener('submit', attendeeView.updateAttendee);

    let toggleAvailability = function(node, classToRemove, classToAdd) {
      classToRemove === 'attend-false' ? node.textContent = 'YES' : node.textContent = 'NO'
      node.classList.remove(classToRemove);
      node.classList.add(classToAdd);
    }

    let toggleCheckboxEvent = function(node) {
      let toggleCheckbox = document.getElementById(`${attendeeIdToEdit}-option${node}`);
      let correspondingAvailabilityNode = toggleCheckbox.parentElement.parentElement.parentElement.parentElement.parentElement.nextSibling.childNodes[node];

      correspondingAvailabilityNode.addEventListener('click', function() {
        toggleCheckbox.checked ? toggleCheckbox.checked = false : toggleCheckbox.checked = true;
        toggleCheckbox.checked ? toggleAvailability(correspondingAvailabilityNode, 'attend-false', 'attend-true') : toggleAvailability(correspondingAvailabilityNode, 'attend-true', 'attend-false')
      });
    };

    for (var i = 1; i < editMode.childNodes.length; i++) {
      let proxyInput = editMode.childNodes[i];
      toggleCheckboxEvent(i);
    };
  };

  attendeeView.updateAttendee = function(event) {
    event.preventDefault();

    let idToUpdate = parseInt(event.target.id.replace(/[^0-9\.]/g, ''), 10);
    let updatedAttendeeName = event.target.attendeeName.value;
    let updatedAttendeeAvailability = [];

    for (var i = 2; i < event.target.length - 1; i++) {
      updatedAttendeeAvailability.push({
        [`option${i - 1}`] : event.target[i].checked
      });
    };

    var updatedAttendee = new Attendee({
      name: updatedAttendeeName,
      availability: updatedAttendeeAvailability
    });

    Attendee.editAttendeeData(idToUpdate, updatedAttendee);

  };

  attendeeView.toggleInputs = function() {
    let availabilityCheckboxes = document.getElementsByClassName('schedule-option');

    let toggleCheckedClass = function(node) {
      node.addEventListener('click', function(event) {
        event.preventDefault();

        let checked = function() {
          node.classList.add('initial-availability');
          node.getElementsByTagName('input')[0].checked = true;
        };

        let unchecked = function() {
          node.classList.remove('initial-availability')
          node.getElementsByTagName('input')[0].checked = false;
        };

        node.classList.contains('initial-availability') ? unchecked() : checked();
      });
    };

    for (var i = 0; i < availabilityCheckboxes.length; i ++) {
      toggleCheckedClass(availabilityCheckboxes[i].parentElement);
    };
  };

  attendeeView.resetInputs = function() {
    let attendeeNameInput = document.getElementById('attendee-name');
    attendeeNameInput.value = '';
    attendeeNameInput.focus();

    let scheduleOptions = document.querySelectorAll('.schedule-option');

    for (var i = 0; i < scheduleOptions.length; i++) {
      scheduleOptions[i].checked = false;
      scheduleOptions[i].parentElement.classList.remove('initial-availability');
    }
  };

  module.attendeeView = attendeeView;

})(window);
