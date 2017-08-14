'use strict';

const formatName = require('./name');

/**
 * Format names
 * @param {string[]} names
 * @returns {string}
 */
module.exports = function(names){
    return (Array.isArray(names) ? names : [])
        .map(formatName)
        .filter((name) => name.length)
        .filter((name, index, array) => array.indexOf(name) === index)
        .join(', ') || '*';
};
