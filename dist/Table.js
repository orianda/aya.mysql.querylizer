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
    constructor(name, schema = '') {
        this.name = name;
        this.schema = schema;
        this.reference = [schema, name]
            .filter((value) => !!value)
            .map(name_1.default)
            .join('.');
    }
    count(where, amount, offset) {
        const queryWhere = where_1.default(where);
        const queryLimit = limit_1.default(amount, offset);
        return sql `SELECT COUNT(*) AS \`amount\` FROM ${this.reference} ${queryWhere} ${queryLimit}`;
    }
    select(names, where, amount, offset, order) {
        const queryNames = names_1.default(names);
        const queryWhere = where_1.default(where);
        const queryOrder = order_1.default(order);
        const queryLimit = limit_1.default(amount, offset);
        return sql `SELECT ${queryNames} FROM ${this.reference} ${queryWhere} ${queryOrder} ${queryLimit}`;
    }
    insert(values) {
        const queryValues = values_1.default(values) || '() VALUES ()';
        return sql `INSERT INTO ${this.reference} ${queryValues}`;
    }
    update(values, where, amount, offset, order) {
        const queryValues = values_1.default(values);
        const queryWhere = where_1.default(where);
        const queryOrder = order_1.default(order);
        const queryLimit = limit_1.default(amount, offset);
        return queryValues && sql `UPDATE ${this.reference} ${queryValues} ${queryWhere} ${queryOrder} ${queryLimit}`;
    }
    replace(values, where, amount, offset, order) {
        const queryValues = values_1.default(values);
        const queryWhere = where_1.default(where);
        const queryOrder = order_1.default(order);
        const queryLimit = limit_1.default(amount, offset);
        return queryValues && sql `REPLACE ${this.reference} ${queryValues} ${queryWhere} ${queryOrder} ${queryLimit}`;
    }
    remove(where, amount, offset, order) {
        const queryWhere = where_1.default(where);
        const queryOrder = order_1.default(order);
        const queryLimit = limit_1.default(amount, offset);
        return sql `DELETE FROM ${this.reference} ${queryWhere} ${queryOrder} ${queryLimit}`;
    }
}
exports.default = Table;
