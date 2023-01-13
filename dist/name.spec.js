"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const name_1 = __importDefault(require("./name"));
describe('NAME', () => {
    [
        {
            name: undefined,
            assert: ''
        },
        {
            name: '',
            assert: '``'
        },
        {
            name: ' ',
            assert: '` `'
        },
        {
            name: 'name',
            assert: '`name`'
        },
        {
            name: NaN,
            assert: ''
        },
        {
            name: 1,
            assert: '`1`'
        },
        {
            name: null,
            assert: ''
        },
        {
            name: {},
            assert: ''
        }
    ].forEach(({ name, assert }) => {
        describe(String(JSON.stringify(name)), () => {
            it(`should be "${JSON.stringify(name)}"`, () => {
                const query = (0, name_1.default)(name);
                (0, chai_1.expect)(query).to.equal(assert);
            });
        });
    });
});
