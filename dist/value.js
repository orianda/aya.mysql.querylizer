"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encodeString = (value) => {
    const query = value
        .toString()
        .replace(/(["\\])/g, '\\$1');
    return `"${query}"`;
};
const encodeNumber = (value) => {
    return isFinite(value) ? value.toString() : 'NULL';
};
const encodeBoolean = (value) => {
    return value ? 'TRUE' : 'FALSE';
};
const encodeDate = (value) => {
    const time = value.getTime();
    if (isNaN(time)) {
        return 'NULL';
    }
    const string = value.toISOString();
    return encodeString(string);
};
exports.default = (value) => {
    if (typeof value === 'string') {
        return encodeString(value);
    }
    if (typeof value === 'number') {
        return encodeNumber(value);
    }
    if (typeof value === 'boolean') {
        return encodeBoolean(value);
    }
    if (value instanceof Date) {
        return encodeDate(value);
    }
    return 'NULL';
};
