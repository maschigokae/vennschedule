'use strict';

const createError = require('http-errors');
const storage = require('../lib/storage.js');
var idIncrementer = 0;

const Attendee = module.exports = function(name, availability) {
  if (!name) throw createError(400, 'expected name');
  if (!availability) throw createError(400, 'expected availability data');

  this.id = idIncrementer + 1;
  idIncrementer++;
  this.name = name;
  this.availability = availability;
};

Attendee.setupAttendee = function(_attendee) {
  try {
    let attendee = new Attendee(_attendee.name, _attendee.availability);
    return storage.createEntry('attendee', attendee);
  } catch (err) {
    return Promise.reject(err);
  };
};

Attendee.lookupAttendee = function(id) {
  return storage.lookupEntry('attendee', id);
};

Attendee.lookupAllAttendees = function() {
  return storage.lookupAllEntries('attendee');
};

Attendee.editAttendee = function(id, _attendee) {
  let checkAttendeeData = function(name, availability) {
    if (!name) throw createError(400, 'expected name');
    if (!availability) throw createError(400, 'expected availability data');
  };

  try {
    checkAttendeeData(_attendee.name, _attendee.availability);
    return storage.editEntry('attendee', id, _attendee);
  } catch (err) {
    return Promise.reject(err);
  };
};

Attendee.deleteAttendee = function(id) {
  return storage.deleteEntry('attendee', id);
};
