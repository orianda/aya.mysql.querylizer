"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whereValue = void 0;
const whereBetween_1 = require("./whereBetween");
const whereIn_1 = require("./whereIn");
const whereIs_1 = require("./whereIs");
const whereValue = (value, negate) => {
    if (Array.isArray(value)) {
        return whereIn_1.whereIn(value, negate);
    }
    else if (value instanceof Date) {
        return whereIs_1.whereIs(value, negate);
    }
    else if (value instanceof Object) {
        return whereBetween_1.whereBetween(value, negate);
    }
    else {
        return whereIs_1.whereIs(value, negate);
    }
};
exports.whereValue = whereValue;
