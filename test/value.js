'use strict';

const expect = require('chai').expect;
const formatValue = require('../src/value');

describe('VALUE', function () {

    describe('string', function () {

        it('should format some string', function () {
            const query = formatValue('string');
            expect(query).to.equal('"string"');
        });

        it('should format quoted string', function () {
            const query = formatValue('some quoted "string"');
            expect(query).to.equal('"some quoted \\"string\\""');
        });

        it('should format empty string', function () {
            const query = formatValue('');
            expect(query).to.equal('""');
        });
    });

    describe('number', function () {

        it('should format positive integer', function () {
            const query = formatValue(12);
            expect(query).to.equal('12');
        });

        it('should format negative integer', function () {
            const query = formatValue(-12);
            expect(query).to.equal('-12');
        });

        it('should format big positive integer', function () {
            const query = formatValue(12E+12);
            expect(query).to.equal('12000000000000');
        });

        it('should format big negative integer', function () {
            const query = formatValue(-12E+12);
            expect(query).to.equal('-12000000000000');
        });

        it('should format positive float', function () {
            const query = formatValue(12.12);
            expect(query).to.equal('12.12');
        });

        it('should format negative float', function () {
            const query = formatValue(-12.12);
            expect(query).to.equal('-12.12');
        });

        it('should format big positive float', function () {
            const query = formatValue(12.12E-12);
            expect(query).to.equal('1.212E-11');
        });

        it('should format big negative float', function () {
            const query = formatValue(-12.12E-12);
            expect(query).to.equal('-1.212E-11');
        });

        it('should format NaN', function () {
            const query = formatValue(NaN);
            expect(query).to.equal('NULL');
        });

        it('should format positive infinity', function () {
            const query = formatValue(Infinity);
            expect(query).to.equal('NULL');
        });

        it('should format negative infinity', function () {
            const query = formatValue(-Infinity);
            expect(query).to.equal('NULL');
        });
    });

    describe('boolean', function () {

        it('should format true', function () {
            const query = formatValue(true);
            expect(query).to.equal('TRUE');
        });

        it('should format false', function () {
            const query = formatValue(false);
            expect(query).to.equal('FALSE');
        });
    });

    describe('Date', function () {

        it('should format valid date', function () {
            const query = formatValue(new Date(1502579091963));
            expect(query).to.equal('"2017-08-12T23:04:51.963Z"');
        });

        it('should format invalid date', function () {
            const query = formatValue(new Date('invalid'));
            expect(query).to.equal('NULL');
        });
    });

    describe('Array', function () {

        it('should insert list', function () {
            const query = formatValue([0, 1, -2, '3', 'four']);
            expect(query).to.equal('"0,1,-2,3,four"');
        });

        it('should insert empty list', function () {
            const query = formatValue([]);
            expect(query).to.equal('""');
        });
    });

    describe('Object', function () {

        it('should insert native object', function () {
            const query = formatValue({});
            expect(query).to.equal('"[object Object]"');
        });

        it('should insert custom object', function () {
            const query = formatValue({
                toString: () => 'custom stringified object'
            });
            expect(query).to.equal('"custom stringified object"');
        });

        it('should format null', function () {
            const query = formatValue(null);
            expect(query).to.equal('NULL');
        });
    });

    describe('undefined', function () {

        it('should format undefined', function () {
            const query = formatValue(undefined);
            expect(query).to.equal('NULL');
        });
    });

    describe('function', function () {
        const query = formatValue(() => null);
        expect(query).to.equal('NULL');
    });
});
