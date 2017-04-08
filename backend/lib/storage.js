'use strict';

const inMemoryStorage = {};
const createError = require('http-errors');
const debug = require('debug')('vennschedule:storage');

module.exports = exports = {};

exports.createEntry = function(schemaName, entry) {
  debug('createEntry');

  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(createError(400, 'expected schema name'));
    if (!entry) return reject(createError(400, 'expected entry'));
    if (!inMemoryStorage[schemaName]) inMemoryStorage[schemaName] = {};

    inMemoryStorage[schemaName][entry.id] = entry;

    resolve(entry);
  });
};

exports.lookupEntry = function(schemaName, id) {
  debug('lookupEntry');

  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(createError(400, 'expected schema name'));
    if (!id) return reject(createError(400, 'expected id'));

    var schema = inMemoryStorage[schemaName];
    if (!schema) return reject(createError(404, 'schema not found'));

    var entry = schema[id];
    if (!entry) return reject(createError(404, 'entry not found'));

    resolve(entry);
  });
};

exports.editEntry = function(schemaName, id, entry) {
  debug('editEntry');

  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(createError(400, 'expected schema name'));
    if (!id) return reject(createError(400, 'expected id'));
    if (!entry) return reject(createError(400, 'expected entry'));

    var schema = inMemoryStorage[schemaName];
    if (!schema) return reject(createError(404, 'schema not found'));

    var originalEntry = schema[id];
    if (!originalEntry) return reject(createError(404, 'original entry not found'));

    inMemoryStorage[schemaName][originalEntry.id] = entry;
    entry.id = originalEntry.id;

    resolve(entry);
  });
};

exports.lookupAllEntries = function(schemaName) {
  debug('lookupAllEntries');

  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(createError(400, 'expected schema name'));

    var schema = inMemoryStorage[schemaName];
    if (!schema) return reject(createError(404, 'schema not found, or no entries exist for schema'));

    resolve(schema);
  });
};
