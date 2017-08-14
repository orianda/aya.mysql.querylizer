'use strict';

const formatName = require('./name');
const formatValue = require('./value');

/**
 * Format multiple entries
 * @param {Object[]} values
 * @returns {string}
 */
function formatList(values) {
  const cols = values.reduce((cols, item) => {
    const names = Object.keys(item)
      .filter((name) => cols.indexOf(name) < 0);
    return cols.concat(names);
  }, []);
  const vals = values.map((item) => {
    const vals = cols
      .map((col) => item[col])
      .map(formatValue)
      .join(', ');
    return '(' + vals + ')';
  });
  return '(' + cols.map(formatName).join(', ') + ') VALUES ' + vals.join(', ');
}

/**
 * Format single entry
 * @param {Object} values
 * @returns {string}
 */
function formatItem(values) {
  const query = [];
  if (!values || typeof values !== 'object') {
    return '';
  }
  for (let name of Object.keys(values)) {
    let value = values[name];
    name = formatName(name);
    if (name) {
      query.push(name + ' = ' + formatValue(value));
    }
  }
  return query.length ? 'SET ' + query.join(', ') : '';
}

/**
 * Format values query
 * @param {Object|Object[]} values
 * @returns {string}
 */
module.exports = function (values) {
  const format = Array.isArray(values) ? formatList : formatItem;
  return format(values);
};
