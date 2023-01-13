"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const names_1 = __importDefault(require("./names"));
describe('NAMES', () => {
    [
        {
            names: undefined,
            assert: '*'
        },
        {
            names: true,
            assert: '*'
        },
        {
            names: false,
            assert: '*'
        },
        {
            names: 1,
            assert: '`1`'
        },
        {
            names: -1,
            assert: '`-1`'
        },
        {
            names: NaN,
            assert: '*'
        },
        {
            names: -NaN,
            assert: '*'
        },
        {
            names: Infinity,
            assert: '*'
        },
        {
            names: -Infinity,
            assert: '*'
        },
        {
            names: -Infinity,
            assert: '*'
        },
        {
            names: '',
            assert: '``'
        },
        {
            names: ' ',
            assert: '` `'
        },
        {
            names: 'name',
            assert: '`name`'
        },
        {
            names: null,
            assert: '*'
        },
        {
            names: [],
            assert: '*'
        },
        {
            names: [undefined, '', ' '],
            assert: '``, ` `'
        },
        {
            names: ['name'],
            assert: '`name`'
        },
        {
            names: ['name', 'name', 'name'],
            assert: '`name`'
        },
        {
            names: ['name1', 'name2', 'name3'],
            assert: '`name1`, `name2`, `name3`'
        },
        {
            names: [1, 2, 3, NaN],
            assert: '`1`, `2`, `3`'
        },
        {
            names: [true, false],
            assert: '*'
        },
        {
            names: [{}, []],
            assert: '*'
        },
        {
            names: [{ a: 1 }, [1, 2]],
            assert: '*'
        }
    ].forEach(({ names, assert }) => {
        describe(String(JSON.stringify(names)), () => {
            it(`should be "${assert}"`, () => {
                const query = (0, names_1.default)(names);
                (0, chai_1.expect)(query).to.equal(assert);
            });
        });
    });
});
