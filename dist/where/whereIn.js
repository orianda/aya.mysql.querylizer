"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whereIn = void 0;
const value_1 = __importDefault(require("../value"));
const whereIn = (values, negate) => {
    if (!values.length) {
        return '';
    }
    const query = values
        .map(value_1.default)
        .join(', ');
    return `${negate ? 'NOT IN' : 'IN'} (${query})`;
};
exports.whereIn = whereIn;
