"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const value_1 = __importDefault(require("./value"));
describe('VALUE', () => {
    describe('string', () => {
        it('should format some string', () => {
            const query = (0, value_1.default)('string');
            (0, chai_1.expect)(query).to.equal('"string"');
        });
        it('should format quoted string', () => {
            const query = (0, value_1.default)('some quoted "string"');
            (0, chai_1.expect)(query).to.equal('"some quoted \\"string\\""');
        });
        it('should format empty string', () => {
            const query = (0, value_1.default)('');
            (0, chai_1.expect)(query).to.equal('""');
        });
    });
    describe('number', () => {
        it('should format positive integer', () => {
            const query = (0, value_1.default)(12);
            (0, chai_1.expect)(query).to.equal('12');
        });
        it('should format negative integer', () => {
            const query = (0, value_1.default)(-12);
            (0, chai_1.expect)(query).to.equal('-12');
        });
        it('should format big positive integer', () => {
            const query = (0, value_1.default)(12E+12);
            (0, chai_1.expect)(query).to.equal('12000000000000');
        });
        it('should format big negative integer', () => {
            const query = (0, value_1.default)(-12E+12);
            (0, chai_1.expect)(query).to.equal('-12000000000000');
        });
        it('should format positive float', () => {
            const query = (0, value_1.default)(12.12);
            (0, chai_1.expect)(query).to.equal('12.12');
        });
        it('should format negative float', () => {
            const query = (0, value_1.default)(-12.12);
            (0, chai_1.expect)(query).to.equal('-12.12');
        });
        it('should format big positive float', () => {
            const query = (0, value_1.default)(12.12E-12);
            (0, chai_1.expect)(query).to.equal('1.212e-11');
        });
        it('should format big negative float', () => {
            const query = (0, value_1.default)(-12.12E-12);
            (0, chai_1.expect)(query).to.equal('-1.212e-11');
        });
        it('should format NaN', () => {
            const query = (0, value_1.default)(NaN);
            (0, chai_1.expect)(query).to.equal('NULL');
        });
        it('should format positive infinity', () => {
            const query = (0, value_1.default)(Infinity);
            (0, chai_1.expect)(query).to.equal('NULL');
        });
        it('should format negative infinity', () => {
            const query = (0, value_1.default)(-Infinity);
            (0, chai_1.expect)(query).to.equal('NULL');
        });
    });
    describe('boolean', () => {
        it('should format true', () => {
            const query = (0, value_1.default)(true);
            (0, chai_1.expect)(query).to.equal('TRUE');
        });
        it('should format false', () => {
            const query = (0, value_1.default)(false);
            (0, chai_1.expect)(query).to.equal('FALSE');
        });
    });
    describe('Date', () => {
        it('should format valid date', () => {
            const query = (0, value_1.default)(new Date(1502579091963));
            (0, chai_1.expect)(query).to.equal('"2017-08-12T23:04:51.963Z"');
        });
        it('should format invalid date', () => {
            const query = (0, value_1.default)(new Date('invalid'));
            (0, chai_1.expect)(query).to.equal('NULL');
        });
    });
    describe('Array', () => {
        it('should insert list', () => {
            const query = (0, value_1.default)([0, 1, -2, '3', 'four']);
            (0, chai_1.expect)(query).to.equal('NULL');
        });
        it('should insert empty list', () => {
            const query = (0, value_1.default)([]);
            (0, chai_1.expect)(query).to.equal('NULL');
        });
    });
    describe('Object', () => {
        it('should insert native object', () => {
            const query = (0, value_1.default)({});
            (0, chai_1.expect)(query).to.equal('NULL');
        });
        it('should insert custom object', () => {
            const query = (0, value_1.default)({
                toString: () => 'custom stringified object'
            });
            (0, chai_1.expect)(query).to.equal('NULL');
        });
        it('should format null', () => {
            const query = (0, value_1.default)(null);
            (0, chai_1.expect)(query).to.equal('NULL');
        });
    });
    describe('undefined', () => {
        it('should format undefined', () => {
            const query = (0, value_1.default)(undefined);
            (0, chai_1.expect)(query).to.equal('NULL');
        });
    });
    describe('function', () => {
        const query = (0, value_1.default)((() => null));
        (0, chai_1.expect)(query).to.equal('NULL');
    });
});
