'use strict';

/**
 * Format limit
 * @param {number} [amount=0]
 * @param {number} [offset=0]
 * @returns {string}
 */
module.exports = function (amount, offset) {
    if (amount > 0 && offset > 0) {
        return 'LIMIT ' + offset + ', ' + amount;
    } else if (amount > 0) {
        return 'LIMIT ' + amount;
    } else if (offset > 0) {
        return 'LIMIT OFFSET ' + offset;
    }
    return '';
};