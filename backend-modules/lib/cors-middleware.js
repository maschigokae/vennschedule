'use strict';

module.exports = function(req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.append('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
};
