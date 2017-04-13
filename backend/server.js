'use strict';

// main dependencies
const express = require('express');
const cors = require('./lib/cors-middleware.js');
const attendeeRouter = require('./route/attendee-router.js');

// dev tools
const morgan = require('morgan');
const debug = require('debug')('vennschedule:server');

// app settings, server setup
const PORT = 8080;
const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(attendeeRouter);

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
