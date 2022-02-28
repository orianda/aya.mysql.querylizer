"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whereBetween = void 0;
const value_1 = __importDefault(require("../value"));
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
exports.whereBetween = whereBetween;
