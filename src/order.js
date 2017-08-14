'use strict';

const formatName = require('./name');

/**
 * Format order
 * @param {string[]} order
 * @returns {string}
 */
module.exports = function (order) {
  const query = (Array.isArray(order) ? order : [])
    .map((name) => {
      let desc = false;
      name = formatName(name);
      name = name.substring(1, name.length - 1);
      if ((/^[+-]/).test(name)) {
        desc = name.substring(0, 1) === '-';
        name = name.substring(1);
      }
      return {name, desc};
    })
    .filter((entry) => entry.name.length)
    .filter((entry, index, array) => {
      return array
        .slice(index + 1)
        .every((e) => e.name !== entry.name);
    })
    .map((entry) => formatName(entry.name) + ' ' + (entry.desc ? 'DESC' : 'ASC'));
  return query.length ? 'ORDER BY ' + query.join(', ') : '';
};