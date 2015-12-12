'use strict';

var expect = require('chai').expect,
    limit = require('../src/limit');

describe('LIMIT', function () {
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
    ].forEach(function (config) {
        describe(JSON.stringify([config.amount, config.offset]), function () {
            it('should be "' + config.assert + '"', function () {
                var query = limit(config.amount, config.offset);
                expect(query).to.equal(config.assert);
            });
        });
    });
});