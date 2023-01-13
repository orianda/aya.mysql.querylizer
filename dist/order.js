"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const name_1 = __importDefault(require("./name"));
exports.default = (order = []) => {
    const query = (Array.isArray(order) ? order : [order])
        .filter((order) => typeof order === 'string' || typeof order === 'number' && isFinite(order))
        .map((order) => {
        const [, mode = '+', name] = order
            .toString()
            .match(/^([+-])?(.*)$/) || [];
        return { name, mode };
    })
        .filter((order, index, orders) => orders
        .slice(index + 1)
        .every(({ name }) => name !== order.name))
        .map(({ name, mode }) => (0, name_1.default)(name) + ' ' + (mode === '-' ? 'DESC' : 'ASC'))
        .join(', ');
    return query ? `ORDER BY ${query}` : '';
};
