'use strict';

var _ = require('lodash');

/**
 * Encode order value
 * @param {Object} order
 * @param {string} name
 * @returns {Object}
 */
function encodeOrder(order, name) {
    var dir;
    name = _.trim(name);
    dir = name[0];
    if (dir === '+' || dir === '-') {
        name = name.substring(1).trim();
    }
    if (name.length) {
        dir = dir === '-' ? 'DESC' : 'ASC';
        order[name] = '`' + name + '` ' + dir;
    }
    return order;
}

/**
 * Format order
 * @param {string[]} order
 * @returns {string}
 */
module.exports = function (order) {
    order = _.reduce(order, encodeOrder, {});
    order = _.values(order);
    return order.length ? 'ORDER BY ' + order.join(', ') : '';
};