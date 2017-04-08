'use strict';

const createError = require('http-errors');
var idIncrementer = 0;

const Attendee = module.exports = function(name, availability) {
  if (!name) throw createError(400, 'expected name');
  if (!availability) throw createError(400, 'expected availability data');

  this.id = idIncrementer + 1;
  idIncrementer++;
  this.name = name;
  this.availability = availability;
};
