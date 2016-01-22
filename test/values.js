'use strict';

var expect = require('chai').expect,
    values = require('../src/values');

describe('VALUES names', function () {
    [
        {
            names: undefined,
            assert: {
                query: '',
                params: []
            }
        },
        {
            names: {},
            assert: {
                query: '',
                params: []
            }
        },
        {
            names: {
                '': '',
                ' ': ' '
            },
            assert: {
                query: '',
                params: []
            }
        },
        {
            names: {
                name: 'value'
            },
            assert: {
                query: 'SET `name` = ?',
                params: ['value']
            }
        },
        {
            names: {
                name1: 'value1',
                name2: 'value2',
                name3: 'value3'
            },
            assert: {
                query: 'SET `name1` = ?, `name2` = ?, `name3` = ?',
                params: ['value1', 'value2', 'value3']
            }
        }
    ].forEach(function (config) {
        describe(JSON.stringify(config.names), function () {
            it('should be "' + config.assert[0] + '"', function () {
                var query = values(config.names);
                expect(query).to.deep.equal(config.assert);
            });
        });
    });
});

describe('VALUES boolean', function () {
    [true, false].forEach(function (value) {
        [value, value.toString(), value.toString().toUpperCase()].forEach(function (input) {
            describe(typeof input + ' - ' + input, function () {
                it('should be ' + value, function () {
                    var query = values({names: input});
                    expect(query).to.deep.equal({
                        query: 'SET `names` = ?',
                        params: [value]
                    });
                });
            });
        });
    });
});

describe('VALUES numbers', function () {
    [0, 1.1, 1.1E1, 1.1E+1, 1.1E-1].forEach(function (value) {
        ['', '+', '-'].forEach(function (sign) {
            var output = parseFloat(sign + value);
            [output, sign + value].forEach(function (input) {
                describe(JSON.stringify(input), function () {
                    it('should be ' + output, function () {
                        var query = values({names: input});
                        expect(query).to.deep.equal({
                            query: 'SET `names` = ?',
                            params: [output]
                        });
                    });
                });
            });
        });
    });
});

describe('VALUES object', function () {
    var inputs = [],
        outputs = [];

    [0, 1.1, 1.1E1, 1.1E+1, 1.1E-1].forEach(function (value) {
        ['', '+', '-'].forEach(function (sign) {
            var output = parseFloat(sign + value);
            [output, sign + value].forEach(function (input) {
                inputs.push(input);
                outputs.push(output);
            });
        });
    });

    describe('array', function () {
        var assertIn = inputs,
            assertOut = outputs;
        it('should be normalized', function () {
            var query = values({names: assertIn});
            expect(query).to.deep.equal({
                query: 'SET `names` = ?',
                params: [assertOut]
            });
        });
    });

    describe('object', function () {
        var assertIn = Object.assign({}, inputs),
            assertOut = Object.assign({}, outputs);
        it('should be normalized', function () {
            var query = values({names: assertIn});
            expect(query).to.deep.equal({
                query: 'SET `names` = ?',
                params: [assertOut]
            });
        });
    });

    describe('nested array', function () {
        var assertIn = inputs.concat(inputs, Object.assign({}, inputs)),
            assertOut = outputs.concat(outputs, Object.assign({}, outputs));
        it('should be normalized', function () {
            var query = values({names: assertIn});
            expect(query).to.deep.equal({
                query: 'SET `names` = ?',
                params: [assertOut]
            });
        });
    });

    describe('nested object', function () {
        var assertIn = Object.assign({}, inputs.concat(inputs, Object.assign({}, inputs))),
            assertOut = Object.assign({}, outputs.concat(outputs, Object.assign({}, outputs)));
        it('should be normalized', function () {
            var query = values({names: assertIn});
            expect(query).to.deep.equal({
                query: 'SET `names` = ?',
                params: [assertOut]
            });
        });
    });
});

describe('VALUES string', function () {
    ['', '+', '-'].forEach(function (sign) {
        it('should be "' + sign + '"', function () {
            var query = values({names: sign});
            expect(query).to.deep.equal({
                query: 'SET `names` = ?',
                params: [sign]
            });
        });
    });
});