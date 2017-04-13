'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Attendee = require('../../backend-modules/model/attendee.js');

const PORT = process.env.PORT || 8080;

require('../../server.js');

const url = `http://localhost:${PORT}`;

const exampleAttendee = {
  name: 'Joe',
  availability: [
    { option1: true },
    { option2: false },
    { option3: true },
    { option4: true },
    { option5: false }
  ]
};

describe('API routes for \'Attendee\' resource', function() {
  describe('POST: /api/attendee (create new attendee)', function() {
    describe('with a valid body', function() {
      it('should return data for a new attendee', done => {
        request.post(`${url}/api/attendee`)
        .send(exampleAttendee)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Joe');
          expect(res.body.availability).to.be.an('array');
          done();
        });
      });
    });

    describe('with an invalid body', function() {
      it('should return a 400 \'bad request\' error', done => {
        request.post(`${url}/api/attendee`)
        .send({})
        .end((err, res) => {
          expect(err.status).to.equal(400);
          expect(res.status).to.equal(400);
          expect(res.res.statusMessage).to.equal('Bad Request');
          done();
        });
      });
    });

    describe('with required fields missing', function() {
      it('should return a 400 \'bad request\' error', done => {
        request.post(`${url}/api/attendee`)
        .send({
          name: '',
          availability: [
            { option1: true },
            { option2: false },
            { option3: true },
            { option4: true },
            { option5: false }
          ]
        })
        .end((err, res) => {
          expect(err.status).to.equal(400);
          expect(res.status).to.equal(400);
          expect(res.res.statusMessage).to.equal('Bad Request');
          done();
        });
      });
    });
  });

  describe('GET: /api/attendee (get all attendees)', function() {
    it('should return an object containing all existing attendee records', done => {
      request.get(`${url}/api/attendee`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        // There should be one attendee that was created during the POST test
        expect(Object.getOwnPropertyNames(res.body).length).to.equal(1);
        done();
      });
    });
  });

  describe('GET: /api/attendee/:id (get an attendee by id)', function() {
    describe('request to a valid attendee id', function() {
      it('should return data for the requested attendee', done => {
        request.get(`${url}/api/attendee/1`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal('Joe');
          expect(res.body.availability).to.be.an('array');
          expect(res.body.availability.length).to.be.equal(5);
          done();
        });
      });
    });

    describe('request to an invalid attendee id', function() {
      it('should return a 404 \'not found\' error', done => {
        request.get(`${url}/api/attendee/invalid`)
        .end((err, res) => {
          expect(err.status).to.equal(404);
          expect(res.status).to.equal(404);
          expect(res.res.statusMessage).to.equal('Not Found');
          done();
        });
      });
    });
  });

  describe('PUT: /api/attendee/:id (edit an attendee record by id)', function() {
    describe('with a valid body and valid attendee id', function() {
      it('should return edited data for the requested attendee', done => {
        request.put(`${url}/api/attendee/1`)
        .send({
          name: 'Joe & Sally',
          availability: [
            { option1: false },
            { option2: false },
            { option3: true },
            { option4: true },
            { option5: true }
          ]
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal('Joe & Sally');
          expect(res.body.availability).to.be.an('array');
          expect(res.body.availability.length).to.be.equal(5);
          expect(res.body.availability[0].option1).to.equal(false);
          done();
        });
      });
    });

    describe('with a valid body and invalid attendee id', function() {
      it('should return a 404 \'not found\' error', done => {
        request.put(`${url}/api/attendee/invalid`)
        .send({
          name: 'Joe & Sally',
          availability: [
            { option1: false },
            { option2: false },
            { option3: true },
            { option4: true },
            { option5: true }
          ]
        })
        .end((err, res) => {
          expect(err.status).to.equal(404);
          expect(res.status).to.equal(404);
          expect(res.res.statusMessage).to.equal('Not Found');
          done();
        });
      });
    });

    describe('with an invalid body and valid attendee id', function() {
      it('should return a 400 \'bad request\' error', done => {
        request.put(`${url}/api/attendee/1`)
        .send({
          name: '',
          availability: [
            { option1: false },
            { option2: false },
            { option3: true },
            { option4: true },
            { option5: true }
          ]
        })
        .end((err, res) => {
          expect(err.status).to.equal(400);
          expect(res.status).to.equal(400);
          expect(res.res.statusMessage).to.equal('Bad Request');
          done();
        });
      });
    });
  });

  describe('DELETE: /api/attendee/:id (delete an attendee by id)', function() {
    describe('request to a valid attendee id', function() {
      it('should return a 204 \'no content\' success status', done => {
        request.delete(`${url}/api/attendee/1`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(204);
          expect(res.res.statusMessage).to.equal('No Content');
          expect(res.body).to.be.an('object');
          expect(res.body).to.be.empty;
          done();
        });
      });
    });

    describe('request to an invalid attendee id', function() {
      it('should return a 404 \'not found\' error', done => {
        request.delete(`${url}/api/attendee/invalid`)
        .end((err, res) => {
          expect(err.status).to.equal(404);
          expect(res.status).to.equal(404);
          expect(res.res.statusMessage).to.equal('Not Found');
          done();
        });
      });
    });

    describe('request to an id that has been deleted', function() {
      it('should return a 404 \'not found\' error', done => {
        request.delete(`${url}/api/attendee/1`)
        .end((err, res) => {
          expect(err.status).to.equal(404);
          expect(res.status).to.equal(404);
          expect(res.res.statusMessage).to.equal('Not Found');
          done();
        });
      });
    });
  });

  describe('GET: /api/attendee (get all attendees)', function() {
    it('should return an empty object, since all attendee records were deleted', done => {
      request.get(`${url}/api/attendee`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.empty;
        done();
      });
    });
  });
});
