"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const name_1 = __importDefault(require("./name"));
const value_1 = __importDefault(require("./value"));
const whereIs = (value, negate) => {
    const query = value_1.default(value);
    if (query === 'NULL') {
        return `IS${negate ? ' NOT ' : ' '}NULL`;
    }
    else {
        return `${negate ? '<>' : '='} ${query}`;
    }
};
const whereIn = (values, negate) => {
    if (!values.length) {
        return '';
    }
    const query = values
        .map(value_1.default)
        .join(', ');
    return `${negate ? 'NOT IN' : 'IN'} (${query})`;
};
const whereBetween = (range, negate) => {
    const min = value_1.default(range.min);
    const max = value_1.default(range.max);
    if (min === 'NULL' && max === 'NULL') {
        return '';
    }
    if (min === 'NULL') {
        return (negate ? '> ' : '<= ') + max;
    }
    if (max === 'NULL') {
        return (negate ? '< ' : '>= ') + min;
    }
    return `${negate ? 'NOT BETWEEN' : 'BETWEEN'} ${min} AND ${max}`;
};
const transform = (key, value) => {
    const [, mode = '*', name] = key.match(/^([*+-])?(.*)$/) || [];
    const negate = mode === '-';
    if (name) {
        let query;
        if (Array.isArray(value)) {
            query = whereIn(value, negate);
        }
        else if (value instanceof Date) {
            query = whereIs(value, negate);
        }
        else if (typeof value === 'object' && value) {
            query = whereBetween(value, negate);
        }
        else {
            query = whereIs(value, negate);
        }
        const queries = query ? [`${name_1.default(name)} ${query}`] : [];
        return {
            mode: negate ? '+' : mode,
            queries
        };
    }
    if (Array.isArray(value)) {
        const queries = value
            .map(formatWhere)
            .filter((query) => !!query);
        return { mode, queries };
    }
    return {
        mode,
        queries: []
    };
};
const formatWhere = (where = {}) => {
    where = typeof where === 'object' && where !== null ? where : {};
    const queries = {
        '+': [],
        '-': [],
        '*': []
    };
    Object
        .keys(where)
        .forEach((name) => {
        const issue = transform(name, where[name]);
        queries[issue.mode].push(...issue.queries);
    });
    return Object
        .keys(queries)
        .map((mode) => {
        const list = queries[mode];
        if (list.length === 0) {
            return '';
        }
        if (mode === '+') {
            return list.join(' AND ');
        }
        if (mode === '-') {
            return `NOT (${list.join(' OR ')})`;
        }
        if (list.length === 1) {
            return list[0];
        }
        return `(${list.join(' OR ')})`;
    })
        .filter((query) => !!query)
        .join(' AND ');
};
exports.default = (where) => {
    const query = formatWhere(where);
    return query && `WHERE ${query}`;
};
