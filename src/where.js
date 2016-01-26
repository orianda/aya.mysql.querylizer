'use strict';

var _ = require('lodash'),
    normalizeNames = require('./names'),
    normalizeValue = require('./util/normalize-value');

/**
 * Format between clause
 * @param {*} min
 * @param {*} max
 * @param {boolean} negate
 * @returns {Array|null}
 */
function normalizeBetween(min, max, negate) {
    var query, params;
    if (_.isUndefined(min) && _.isUndefined(max)) {
        return null;
    } else if (_.isUndefined(min)) {
        query = negate ? '> ?' : '<= ?';
        params = [max];
    } else if (_.isUndefined(max)) {
        query = negate ? '< ?' : '>= ?';
        params = [min];
    } else {
        query = 'BETWEEN ? AND ?';
        if (negate) {
            query = 'NOT ' + query;
        }
        params = [min, max];
    }
    return [query, params];
}

/**
 * Format value set
 * @param {string[]} values
 * @param {boolean} negate
 * @returns {Array|null}
 */
function normalizeSet(values, negate) {
    values = _.compact(values);
    if (values.length) {
        let query = 'IN (' + ', ?'.repeat(values.length).substring(2) + ')';
        if (negate) {
            query = 'NOT ' + query;
        }
        return [query, values];
    }
    return null;
}

/**
 * Normalize common compare
 * @param {*} value
 * @param {boolean} negate
 * @returns {Array}
 */
function normalizeCompare(value, negate) {
    var query, params;
    if (value === null) {
        query = negate ? 'IS NOT' : 'IS';
        query += ' NULL';
        params = [];
    } else {
        query = negate ? '<>' : '=';
        query += ' ?';
        params = [value];
    }
    return [query, params];
}

/**
 * Format where subset
 * @param {Object} where
 * @returns {Array|null}
 */
function normalizeSubWhere(where) {
    var issue = normalizeWhere(where),
        query = issue.shift(),
        params = issue.shift();
    if (query) {
        query = '(' + query + ')';
        return [query, params];
    }
    return null;
}

/**
 * Converts where sets to context
 * @param {Object} configs
 * @param {*} value
 * @param {string} index
 * @returns {Object}
 */
function transform(configs, value, index) {
    var name = _.trim(index),
        mode = name[0],
        negate;

    if (mode === '-' || mode === '+' || mode === '*') {
        name = name.substring(1).trim();
    } else {
        mode = '*';
    }

    negate = mode === '-';

    if (name) {
        let config;
        if (Array.isArray(value)) {
            config = normalizeSet(value, negate);
        } else if (value instanceof Date) {
            config = normalizeCompare(value, negate);
        } else if (_.isObject(value)) {
            config = normalizeBetween(value.min, value.max, negate);
        } else if (!_.isUndefined(value)) {
            config = normalizeCompare(value, negate);
        }
        if (config) {
            config[0] = normalizeNames([name]) + ' ' + config[0];
            configs[negate ? '+' : mode].push(config);
        }
    } else {
        if (Array.isArray(value)) {
            value = value.map(normalizeSubWhere);
            value = _.compact(value);
            Array.prototype.push.apply(configs[mode], value);
        }
    }

    return configs;
}

/**
 * Collects values of context
 * @param {Array[]} settings
 * @param {string} mode
 * @returns {Array,null}
 */
function flatten(settings, mode) {
    var queries = _.map(settings, 0),
        params = _.map(settings, 1),
        query;

    if (queries.length === 0) {
        return null;
    } else if (mode === '+') {
        query = queries.join(' AND ');
    } else if (mode === '-') {
        query = 'NOT (' + queries.join(' OR ') + ')';
    } else if (queries.length === 1) {
        query = queries.pop();
    } else {
        query = '(' + queries.join(' OR ') + ')';
    }
    return [query, _.flatten(params)];
}

/**
 * Format where
 * @param {Object} where
 * @returns {Array}
 */
function normalizeWhere(where) {
    var query, params;

    if (!_.isObject(where)) {
        return ['', []];
    }

    where = _.reduce(where, transform, {
        '+': [],
        '-': [],
        '*': []
    });
    where = _.map(where, flatten);
    where = _.compact(where);
    query = _.map(where, 0).join(' AND ');
    params = _.map(where, 1);
    params = _.flatten(params);
    params = params.map(normalizeValue);
    return [query, params];
}

/**
 * Format where
 * @param {Object} where
 * @returns {Object}
 */
module.exports = function (where) {
    var issue = normalizeWhere(where),
        query = issue.shift(),
        params = issue.shift();
    query = query ? 'WHERE ' + query : '';
    return {
        query: query,
        params: params
    };
};