'use strict';

var _ = require('lodash');

/**
 * Encode name
 * @param {string} name
 * @returns {string}
 */
function formatName(name) {
    name = _.trim(name);
    return name.length ? '`' + name + '`' : '';
}

/**
 * Format names
 * @param {string[]} names
 * @returns {string}
 */
module.exports = function formatNames(names) {
    names = _.compact(names);
    names = names.map(formatName);
    names = _.compact(names);
    names = _.uniq(names);
    return names.join(', ') || '*';
};