"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (amount = 0, offset = 0) => {
    if (amount > 0 && offset > 0) {
        return `LIMIT ${offset}, ${amount}`;
    }
    if (amount > 0) {
        return `LIMIT ${amount}`;
    }
    if (offset > 0) {
        return `LIMIT OFFSET ${offset}`;
    }
    return '';
};
