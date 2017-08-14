'use strict';

[
  'name',
  'names',
  'where',
  'order',
  'limit',
  'value',
  'values',
  'Table',
  'Entry',
].forEach((name) => {
  module.exports[name] = require('./' + name.toLowerCase());
});