'use strict';

['names', 'values', 'where', 'order', 'limit'].forEach(function (name) {
    module.exports[name] = require('./' + name);
});