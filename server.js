'use strict';

// main dependencies
const express = require('express');
const cors = require('./backend-modules/lib/cors-middleware.js');
const attendeeRouter = require('./backend-modules/route/attendee-router.js');

// dev tools
const morgan = require('morgan');
const debug = require('debug')('vennschedule:server');

// app settings, server setup
const PORT = process.env.PORT || 8080;
const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(attendeeRouter);

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
