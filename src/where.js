'use strict';

var _ = require('lodash'),
    normalizeNames = require('./names'),
    normalizeValue = require('./util/normalize-value');

/**
 * Format between clause
 * @param {string} name
 * @param {*} min
 * @param {*} max
 * @returns {Array|null}
 */
function normalizeBetween(name, min, max) {
    var query, params;
    name = normalizeNames([name]);
    if (_.isUndefined(min) && _.isUndefined(max)) {
        return null;
    } else if (_.isUndefined(min)) {
        query = name + ' <= ?';
        params = [max];
    } else if (_.isUndefined(max)) {
        query = name + ' >= ?';
        params = [min];
    } else {
        query = name + ' BETWEEN ? AND ?';
        params = [min, max];
    }
    return [query, params];
}

/**
 * Format value set
 * @param {string} name
 * @param {string[]} values
 * @returns {Array|null}
 */
function normalizeSet(name, values) {
    values = _.compact(values);
    if (values.length) {
        let query = normalizeNames([name]) + ' IN (' + ', ?'.repeat(values.length).substring(2) + ')';
        return [query, values];
    }
    return null;
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
        mode = name[0];
    if (mode === '-' || mode === '+' || mode === '*') {
        name = name.substring(1).trim();
    } else {
        mode = '*';
    }

    if (name) {
        if (Array.isArray(value)) {
            let config = normalizeSet(name, value);
            if (config) {
                configs[mode].push(config);
            }
        } else if (_.isObject(value)) {
            let config = normalizeBetween(name, value.min, value.max);
            if (config) {
                configs[mode].push(config);
            }
        } else if (!_.isUndefined(value)) {
            let query = normalizeNames([name]) + ' = ?',
                params = [value];
            configs[mode].push([query, params]);
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
    var queries = _.map(settings,0),
        params = _.map(settings,1),
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
 * @returns {Array}
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