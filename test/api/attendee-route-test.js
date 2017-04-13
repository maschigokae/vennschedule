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
  describe('POST Attendee', function() {
    describe('with a valid body', function() {
      it('should return data for an attendee', done => {
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
  });
});
