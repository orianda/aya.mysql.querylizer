"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const _1 = require(".");
const Entry_1 = __importDefault(require("./Entry"));
const limit_1 = __importDefault(require("./limit"));
const name_1 = __importDefault(require("./name"));
const names_1 = __importDefault(require("./names"));
const order_1 = __importDefault(require("./order"));
const Table_1 = __importDefault(require("./Table"));
const value_1 = __importDefault(require("./value"));
const values_1 = __importDefault(require("./values"));
const where_1 = require("./where");
describe('index', () => {
    const srv = { name: _1.name, names: _1.names, value: _1.value, values: _1.values, where: _1.where, order: _1.order, limit: _1.limit, Table: _1.Table, Entry: _1.Entry };
    const lib = {
        name: name_1.default,
        names: names_1.default,
        value: value_1.default,
        values: values_1.default,
        where: where_1.where,
        order: order_1.default,
        limit: limit_1.default,
        Table: Table_1.default,
        Entry: Entry_1.default
    };
    Object
        .keys(srv)
        .forEach((name) => {
        it(`should have ${name}`, () => {
            (0, chai_1.expect)(srv[name]).to.equal(lib[name]);
        });
    });
});
