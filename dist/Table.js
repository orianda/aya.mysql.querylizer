"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const name_1 = __importDefault(require("./name"));
const names_1 = __importDefault(require("./names"));
const where_1 = __importDefault(require("./where"));
const order_1 = __importDefault(require("./order"));
const limit_1 = __importDefault(require("./limit"));
const values_1 = __importDefault(require("./values"));
const sql = (chunks, ...args) => {
    const query = [];
    for (let i = 0, l = chunks.length; i < l; i++) {
        query[i * 2] = chunks[i].trim();
    }
    for (let i = 0, l = args.length; i < l; i++) {
        query[i * 2 + 1] = args[i].trim();
    }
    return query
        .filter((chunk) => !!chunk)
        .join(' ');
};
class Table {
    constructor(name) {
        this.name = name;
    }
    count(where, amount, offset) {
        const name = name_1.default(this.name);
        const queryWhere = where_1.default(where);
        const queryLimit = limit_1.default(amount, offset);
        return sql `SELECT COUNT(*) AS \`amount\` FROM ${name} ${queryWhere} ${queryLimit}`;
    }
    select(names, where, amount, offset, order) {
        const name = name_1.default(this.name);
        const queryNames = names_1.default(names);
        const queryWhere = where_1.default(where);
        const queryOrder = order_1.default(order);
        const queryLimit = limit_1.default(amount, offset);
        return sql `SELECT ${queryNames} FROM ${name} ${queryWhere} ${queryOrder} ${queryLimit}`;
    }
    insert(values) {
        const name = name_1.default(this.name);
        const queryValues = values_1.default(values) || '() VALUES ()';
        return sql `INSERT INTO ${name} ${queryValues}`;
    }
    update(values, where, amount, offset, order) {
        const name = name_1.default(this.name);
        const queryValues = values_1.default(values);
        const queryWhere = where_1.default(where);
        const queryOrder = order_1.default(order);
        const queryLimit = limit_1.default(amount, offset);
        return queryValues && sql `UPDATE ${name} ${queryValues} ${queryWhere} ${queryOrder} ${queryLimit}`;
    }
    replace(values, where, amount, offset, order) {
        const name = name_1.default(this.name);
        const queryValues = values_1.default(values);
        const queryWhere = where_1.default(where);
        const queryOrder = order_1.default(order);
        const queryLimit = limit_1.default(amount, offset);
        return queryValues && sql `REPLACE ${name} ${queryValues} ${queryWhere} ${queryOrder} ${queryLimit}`;
    }
    remove(where, amount, offset, order) {
        const name = name_1.default(this.name);
        const queryWhere = where_1.default(where);
        const queryOrder = order_1.default(order);
        const queryLimit = limit_1.default(amount, offset);
        return sql `DELETE FROM ${name} ${queryWhere} ${queryOrder} ${queryLimit}`;
    }
}
exports.default = Table;
