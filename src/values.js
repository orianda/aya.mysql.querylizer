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
 * Remove invalid names
 * @param {*} value
 * @param {string} name
 * @returns {boolean}
 */
function isStar(value, name) {
    return name === starName;
}

/**
 * Format values query
 * @param {Object} values
 * @returns {Object}
 */
module.exports = function (values) {
    var query;
    values = _.mapKeys(values, formatName);
    values = _.omit(values, isStar);
    query = _.keys(values).join(', ');
    return {
        query: query ? 'SET ' + query : '',
        params: _.values(values).map(normalizeValue)
    };
};