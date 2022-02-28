"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whereIs = void 0;
const value_1 = __importDefault(require("../value"));
const whereIs = (value, negate) => {
    const query = (0, value_1.default)(value);
    if (query === 'NULL') {
        return `IS${negate ? ' NOT ' : ' '}NULL`;
    }
    else {
        return `${negate ? '<>' : '='} ${query}`;
    }
};
exports.whereIs = whereIs;
