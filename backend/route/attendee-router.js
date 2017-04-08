'use strict';

const Attendee = require('../model/attendee.js');
const Router = require('express').Router;
const attendeeRouter = new Router();
const parseJSON = require('body-parser').json();
const debug = require('debug')('vennschedule:attendee-router');

attendeeRouter.post('/api/attendee', parseJSON, function(req, res, next) {
  debug('POST: /api/attendee');

  Attendee.setupAttendee(req.body)
  .then( attendee => res.json(attendee))
  .catch( err => next(err));
});

attendeeRouter.get('/api/attendee/:id', function(req, res, next) {
  debug('GET: /api/attendee/:id');

  Attendee.lookupAttendee(req.params.id)
  .then( attendee => res.json(attendee))
  .catch( err => next(err));
});

attendeeRouter.get('/api/attendee', function(req, res, next) {
  debug('GET: /api/attendee');

  Attendee.lookupAllAttendees()
  .then( attendeeIDs => res.json(attendeeIDs))
  .catch( err => next(err));
});

attendeeRouter.put('/api/attendee/:id', parseJSON, function(req, res, next) {
  debug('PUT: /api/attendee');

  Attendee.editAttendee(req.params.id, req.body)
  .then( attendee => res.json(attendee))
  .catch( err => next(err));
});

attendeeRouter.delete('/api/attendee/:id', function(req, res, next) {
  debug('DELETE: /api/attendee/:id');

  Attendee.deleteAttendee(req.params.id)
  .then(res.sendStatus(204))
  .catch( err => next(err));
});

module.exports = attendeeRouter;
