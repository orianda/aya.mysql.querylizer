'use strict';

var _ = require('lodash');

/**
 * Normalize query value
 * @param {*} value
 * @returns {*}
 */
module.exports = function normalizeValue(value) {
    if (Array.isArray(value)) {
        return _.map(value, normalizeValue);
    }
    if (value instanceof Date) {
        return value;
    }
    if (_.isObject(value)) {
        return _.mapValues(value, normalizeValue);
    }
    if (!_.isString(value)) {
        return value;
    }
    if (value.trim().match(/^true|false$/i)) {
        return value.trim().toLowerCase() === 'true';
    }
    if (!isNaN(value) && value.length) {
        return parseFloat(value);
    }
    return value;
};