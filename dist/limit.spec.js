"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const limit_1 = __importDefault(require("./limit"));
describe('LIMIT', () => {
    [
        {
            amount: undefined,
            offset: undefined,
            assert: ''
        },
        {
            amount: undefined,
            offset: 0,
            assert: ''
        },
        {
            amount: undefined,
            offset: 1,
            assert: 'LIMIT OFFSET 1'
        },
        {
            amount: 0,
            offset: undefined,
            assert: ''
        },
        {
            amount: 0,
            offset: 0,
            assert: ''
        },
        {
            amount: 0,
            offset: 1,
            assert: 'LIMIT OFFSET 1'
        },
        {
            amount: 1,
            offset: undefined,
            assert: 'LIMIT 1'
        },
        {
            amount: 1,
            offset: 0,
            assert: 'LIMIT 1'
        },
        {
            amount: 1,
            offset: 1,
            assert: 'LIMIT 1, 1'
        }
    ].forEach(({ amount, offset, assert }) => {
        describe(JSON.stringify({ amount, offset }), () => {
            it(`should be "${assert}"`, () => {
                const query = (0, limit_1.default)(amount, offset);
                (0, chai_1.expect)(query).to.equal(assert);
            });
        });
    });
});
