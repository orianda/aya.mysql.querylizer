"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const name_1 = __importDefault(require("./name"));
const value_1 = __importDefault(require("./value"));
const formatList = (values) => {
    const keys = values.reduce((keys, row) => {
        const list = Object
            .keys(row)
            .filter((key) => keys.indexOf(key) < 0);
        return keys.concat(list);
    }, []);
    const rows = values.map((row) => {
        const query = keys
            .map((name) => value_1.default(row[name]))
            .join(', ');
        return `(${query})`;
    });
    const keysQuery = keys
        .map(name_1.default)
        .join(', ');
    const rowsQuery = rows
        .join(', ');
    return `(${keysQuery}) VALUES ${rowsQuery}`;
};
/**
 * Format single entry
 * @param {Object} values
 * @returns {string}
 */
const formatItem = (values = {}) => {
    const query = Object
        .keys(values)
        .map((key) => {
        const value = value_1.default(values[key]);
        const name = name_1.default(key);
        return `${name} = ${value}`;
    })
        .join(', ');
    return query ? `SET ${query}` : '';
};
exports.default = (values) => Array.isArray(values) ? formatList(values) : formatItem(values);
