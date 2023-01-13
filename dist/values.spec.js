"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const values_1 = __importDefault(require("./values"));
describe('VALUES', () => {
    describe('names', () => {
        [
            {
                names: undefined,
                assert: ''
            },
            {
                names: {},
                assert: ''
            },
            {
                names: {
                    '': '',
                    ' ': ' '
                },
                assert: 'SET `` = "", ` ` = " "'
            },
            {
                names: {
                    name: 'value'
                },
                assert: 'SET `name` = "value"'
            },
            {
                names: {
                    name1: 'value1',
                    name2: 'value2',
                    name3: 'value3'
                },
                assert: 'SET `name1` = "value1", `name2` = "value2", `name3` = "value3"'
            }
        ].forEach((config) => {
            describe(String(JSON.stringify(config.names)), () => {
                it('should be "' + config.assert[0] + '"', () => {
                    const query = (0, values_1.default)(config.names);
                    (0, chai_1.expect)(query).to.deep.equal(config.assert);
                });
            });
        });
    });
    describe('boolean', () => {
        [true, false].forEach((value) => {
            [value, value.toString(), value.toString().toUpperCase()].forEach((input) => {
                describe(`${typeof input} - ${input.toString()}`, () => {
                    it(`should be ${value.toString()}`, () => {
                        const query = (0, values_1.default)({ names: input });
                        const value = typeof input === 'string' ? '"' + input + '"' : input.toString().toUpperCase();
                        (0, chai_1.expect)(query).to.deep.equal('SET `names` = ' + value);
                    });
                });
            });
        });
    });
    describe('numbers', () => {
        [0, 1.1, 1.1E1, 1.1E+1, 1.1E-1].forEach((value) => {
            ['', '+', '-'].forEach((sign) => {
                const output = parseFloat(`${sign}${value}`);
                [output, `${sign}${value}`].forEach((input) => {
                    describe(JSON.stringify(input), () => {
                        it(`should be ${output}`, () => {
                            const query = (0, values_1.default)({ names: input });
                            const value = typeof input === 'string' ? '"' + input + '"' : input;
                            (0, chai_1.expect)(query).to.deep.equal(`SET \`names\` = ${value}`);
                        });
                    });
                });
            });
        });
    });
    describe('object', () => {
        const inputs = [];
        [0, 1.1, 1.1E1, 1.1E+1, 1.1E-1].forEach((value) => {
            ['', '+', '-'].forEach((sign) => {
                const output = parseFloat(`${sign}${value}`);
                [output, `${sign}${value}`].forEach((input) => {
                    inputs.push(input);
                });
            });
        });
        describe('array', () => {
            const assertIn = inputs;
            it('should be normalized', () => {
                const query = (0, values_1.default)({ names: assertIn });
                (0, chai_1.expect)(query).to.deep.equal('SET `names` = NULL');
            });
        });
        describe('object', () => {
            const assertIn = Object.assign({}, inputs);
            it('should be normalized', () => {
                const query = (0, values_1.default)({ names: assertIn });
                (0, chai_1.expect)(query).to.deep.equal('SET `names` = NULL');
            });
        });
        describe('nested array', () => {
            const assertIn = inputs.concat(inputs, Object.assign({}, inputs));
            it('should be normalized', () => {
                const query = (0, values_1.default)({ names: assertIn });
                (0, chai_1.expect)(query).to.deep.equal('SET `names` = NULL');
            });
        });
        describe('nested object', () => {
            const assertIn = Object.assign({}, inputs.concat(inputs, Object.assign({}, inputs)));
            it('should be normalized', () => {
                const query = (0, values_1.default)({ names: assertIn });
                (0, chai_1.expect)(query).to.deep.equal('SET `names` = NULL');
            });
        });
    });
    describe('string', () => {
        ['', '+', '-'].forEach((sign) => {
            it('should be "' + sign + '"', () => {
                const query = (0, values_1.default)({ names: sign });
                (0, chai_1.expect)(query).to.deep.equal('SET `names` = "' + sign + '"');
            });
        });
    });
    describe('array', () => {
        it('should insert multiple entries', () => {
            const query = (0, values_1.default)([
                { name1: 'value' },
                { name2: 12 },
                { name3: true },
                { name4: {} },
                {
                    name1: 'entry',
                    name2: 'with',
                    name3: 'all',
                    name4: 'values',
                },
            ]);
            (0, chai_1.expect)(query).to.deep.equal('(`name1`, `name2`, `name3`, `name4`) VALUES ' +
                '("value", NULL, NULL, NULL), ' +
                '(NULL, 12, NULL, NULL), ' +
                '(NULL, NULL, TRUE, NULL), ' +
                '(NULL, NULL, NULL, NULL), ' +
                '("entry", "with", "all", "values")');
        });
    });
});
