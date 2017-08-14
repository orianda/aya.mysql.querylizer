'use strict';

const formatName = require('./name');
const formatValue = require('./value');

/**
 * Normalize common compare
 * @param {*} value
 * @param {boolean} negate
 * @returns {string}
 */
function whereIs(value, negate) {
    const query = formatValue(value);
    if (query === 'NULL') {
        return 'IS' + ( negate ? ' NOT ' : ' ') + 'NULL';
    } else {
        return (negate ? '<>' : '=') + ' ' + query;
    }
}

/**
 * Format value set
 * @param {Array} values
 * @param {boolean} negate
 * @returns {string}
 */
function whereIn(values, negate) {
    if (!values.length) {
        return '';
    }
    values = values.map(formatValue);
    return (negate ? 'NOT ' : '') + 'IN (' + values.join(', ') + ')';
}

/**
 * Format between clause
 * @param {Object} options
 * @param {boolean} negate
 * @returns {string}
 */
function whereBetween(options, negate) {
    const min = formatValue(options.min);
    const max = formatValue(options.max);
    if (min === 'NULL' && max === 'NULL') {
        return '';
    }
    if (min === 'NULL') {
        return (negate ? '> ' : '<= ') + max;
    }
    if (max === 'NULL') {
        return (negate ? '< ' : '>= ') + min;
    }
    return (negate ? 'NOT ' : '') + 'BETWEEN ' + min + ' AND ' + max;
}

/**
 * Converts where sets to context
 * @param {Object} configs
 * @param {*} value
 * @param {string} name
 * @returns {Object}
 */
function transform(configs, value, name) {
    let mode, negate;

    if ((/^[*+-]/).test(name)) {
        mode = name.substring(0, 1);
        name = name.substring(1);
    } else {
        mode = '*';
    }

    negate = mode === '-';

    if (name) {
        let query;
        if (Array.isArray(value)) {
            query = whereIn(value, negate);
        } else if (value instanceof Date) {
            query = whereIs(value, negate);
        } else if (typeof value === 'object' && value) {
            query = whereBetween(value, negate);
        } else {
            query = whereIs(value, negate);
        }
        if (query) {
            query = formatName(name) + ' ' + query;
            configs[negate ? '+' : mode].push(query);
        }
    } else {
        if (Array.isArray(value)) {
            let queries = value
                .map(formatWhere)
                .filter((query) => query.length);
            configs[mode] = configs[mode].concat(queries);
        }
    }

    return configs;
}

/**
 * Join queries into one
 * @param {string[]} queries
 * @param {string} mode
 * @returns {string}
 */
function join(queries, mode) {
    if (queries.length === 0) {
        return '';
    }
    if (mode === '+') {
        return queries.join(' AND ');
    }
    if (mode === '-') {
        return 'NOT (' + queries.join(' OR ') + ')';
    }
    if (queries.length === 1) {
        return queries.pop();
    }
    return '(' + queries.join(' OR ') + ')';
}

/**
 * Format where
 * @param {Object} where
 * @returns {string}
 */
function formatWhere(where) {
    const andQueries = [];
    let queries = {
        '+': [],
        '-': [],
        '*': [],
    };

    if (!where || typeof where !== 'object') {
        return '';
    }

    for (let name of Object.keys(where)) {
        queries = transform(queries, where[name], name);
    }
    for (let mode of Object.keys(queries)) {
        andQueries.push(join(queries[mode], mode));
    }
    return andQueries
        .filter((query) => query.length)
        .join(' AND ');
}

/**
 * Format where query
 * @param {Object} where
 * @returns {string}
 */
module.exports = function (where) {
    const query = formatWhere(where);
    return query && 'WHERE ' + query;
};