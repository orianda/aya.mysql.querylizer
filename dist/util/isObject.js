"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = void 0;
const isObject = (value) => (!!value &&
    typeof value === 'object' &&
    !Array.isArray(value));
exports.isObject = isObject;
