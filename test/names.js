'use strict';

var expect = require('chai').expect,
    names = require('../src/names');

describe('NAMES', function () {
    [
        {
            names: undefined,
            assert: '*'
        },
        {
            names: [],
            assert: '*'
        },
        {
            names: [undefined, '', ' '],
            assert: '*'
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
            names: [1, 2, 3],
            assert: '`1`, `2`, `3`'
        }
    ].forEach(function (config) {
        describe(JSON.stringify(config.names), function () {
            it('should be "' + config.assert + '"', function () {
                var query = names(config.names);
                expect(query).to.equal(config.assert);
            });
        });
    });
});