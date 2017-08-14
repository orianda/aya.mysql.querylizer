'use strict';

/**
 * Format name
 * @param {string|number} name
 * @return {string}
 */
module.exports = function formatName(name) {
  const type = typeof name;
  if (type === 'string') {
    return name ? '`' + name + '`' : '';
  }
  if (type === 'number') {
    return isFinite(name) ? formatName(name.toString()) : '';
  }
  if (type === 'object') {
    return name ? formatName(name.toString()) : '';
  }
  return '';
};