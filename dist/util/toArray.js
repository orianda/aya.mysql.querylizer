"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = void 0;
const toArray = (value) => {
    const values = Array.isArray(value)
        ? value
        : [value];
    return values.filter((value) => value !== undefined);
};
exports.toArray = toArray;
