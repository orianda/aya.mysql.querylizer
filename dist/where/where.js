"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.where = void 0;
const formatWhere_1 = require("./formatWhere");
const where = (where) => {
    const query = where ? (0, formatWhere_1.formatWhere)(where) : '';
    return query && `WHERE ${query}`;
};
exports.where = where;
