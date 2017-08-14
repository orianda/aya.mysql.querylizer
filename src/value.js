'use strict';

/**
 * Formats value
 * @param {*} value
 * @returns {string}
 */
module.exports = function formatValue(value) {
  const type = typeof value;
  if (type === 'string') {
    return '"' + value.replace(/(["\\])/g, '\\$1') + '"';
  }
  if (type === 'number') {
    return isFinite(value) ? value.toString().toUpperCase() : 'NULL';
  }
  if (type === 'boolean') {
    return value ? 'TRUE' : 'FALSE';
  }
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? 'NULL' : formatValue(value.toISOString());
  }
  if (type === 'object') {
    return value ? formatValue(value.toString()) : 'NULL';
  }
  return 'NULL';
};