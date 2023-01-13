"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const order_1 = __importDefault(require("./order"));
describe('ORDER', () => {
    [
        {
            order: undefined,
            assert: ''
        },
        {
            order: true,
            assert: ''
        },
        {
            order: false,
            assert: ''
        },
        {
            order: 12,
            assert: 'ORDER BY `12` ASC'
        },
        {
            order: -12,
            assert: 'ORDER BY `12` DESC'
        },
        {
            order: NaN,
            assert: ''
        },
        {
            order: Infinity,
            assert: ''
        },
        {
            order: -Infinity,
            assert: ''
        },
        {
            order: 'col',
            assert: 'ORDER BY `col` ASC'
        },
        {
            order: '-col',
            assert: 'ORDER BY `col` DESC'
        },
        {
            order: '+col',
            assert: 'ORDER BY `col` ASC'
        },
        {
            order: '',
            assert: 'ORDER BY `` ASC'
        },
        {
            order: '-',
            assert: 'ORDER BY `` DESC'
        },
        {
            order: '+',
            assert: 'ORDER BY `` ASC'
        },
        {
            order: [],
            assert: ''
        },
        {
            order: [undefined, '', ' '],
            assert: 'ORDER BY `` ASC, ` ` ASC'
        },
        {
            order: ['name'],
            assert: 'ORDER BY `name` ASC'
        },
        {
            order: ['+name'],
            assert: 'ORDER BY `name` ASC'
        },
        {
            order: ['-name'],
            assert: 'ORDER BY `name` DESC'
        },
        {
            order: ['name', '+name', '-name'],
            assert: 'ORDER BY `name` DESC'
        },
        {
            order: ['name1', '+name2', '-name3'],
            assert: 'ORDER BY `name1` ASC, `name2` ASC, `name3` DESC'
        },
        {
            order: [1, +2, -3],
            assert: 'ORDER BY `1` ASC, `2` ASC, `3` DESC'
        }
    ].forEach(({ order, assert }) => {
        describe(String(order && JSON.stringify(order)), () => {
            it(`should be "${assert}"`, () => {
                const query = (0, order_1.default)(order);
                (0, chai_1.expect)(query).to.equal(assert);
            });
        });
    });
});
