"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encode = (value) => `\`${value}\``;
exports.default = (value) => {
    if (typeof value === 'string') {
        return encode(value);
    }
    if (typeof value === 'number') {
        return isFinite(value) ? encode(value.toString()) : '';
    }
    return '';
};
