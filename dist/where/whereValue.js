"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whereValue = void 0;
const whereBetween_1 = require("./whereBetween");
const whereIn_1 = require("./whereIn");
const whereIs_1 = require("./whereIs");
const whereValue = (value, negate) => {
    if (Array.isArray(value)) {
        return (0, whereIn_1.whereIn)(value, negate);
    }
    else if (value instanceof Date) {
        return (0, whereIs_1.whereIs)(value, negate);
    }
    else if (value instanceof Object) {
        return (0, whereBetween_1.whereBetween)(value, negate);
    }
    else {
        return (0, whereIs_1.whereIs)(value, negate);
    }
};
exports.whereValue = whereValue;
