'use strict';

/**
 * Format limit
 * @param {number} [amount=0]
 * @param {number} [offset=0]
 */
module.exports = function(amount, offset) {
    if (amount > 0 && offset > 0) {
        return 'LIMIT ' + offset + ', ' + amount;
    }
    if (amount > 0) {
        return 'LIMIT ' + amount;
    }
    if (offset > 0) {
        return 'LIMIT OFFSET ' + offset;
    }
    return '';
};