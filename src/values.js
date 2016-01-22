'use strict';

var _ = require('lodash'),
    normalizeNames = require('./names'),
    normalizeValue = require('./util/normalize-value'),
    starName = formatName('', '');

/**
 * Return sql query of current query object
 * @param {*} value
 * @param {string} name
 * @returns {string}
 */
function formatName(value, name) {
    return normalizeNames([name]) + ' = ?';
}

/**
 * Format values query
 * @param {Object} values
 * @returns {Object}
 */
module.exports = function (values) {
    var query;
    values = _.mapKeys(values, formatName);
    delete values[starName];
    query = _.keys(values).join(', ');
    return {
        query: query ? 'SET ' + query : '',
        params: _.values(values).map(normalizeValue)
    };
};