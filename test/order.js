'use strict';

var expect = require('chai').expect,
    order = require('../src/order');

describe('ORDER', function () {
    [
        {
            names: undefined,
            assert: ''
        },
        {
            names: [],
            assert: ''
        },
        {
            names: [undefined, '', ' '],
            assert: ''
        },
        {
            names: ['name'],
            assert: 'ORDER BY `name` ASC'
        },
        {
            names: ['+name'],
            assert: 'ORDER BY `name` ASC'
        },
        {
            names: ['-name'],
            assert: 'ORDER BY `name` DESC'
        },
        {
            names: ['name', '+name', '-name'],
            assert: 'ORDER BY `name` DESC'
        },
        {
            names: ['name1', '+name2', '-name3'],
            assert: 'ORDER BY `name1` ASC, `name2` ASC, `name3` DESC'
        },
        {
            names: [1, +2, -3],
            assert: 'ORDER BY `1` ASC, `2` ASC, `3` DESC'
        }
    ].forEach(function (config) {
        describe(JSON.stringify(config.names), function () {
            it('should be "' + config.assert + '"', function () {
                var query = order(config.names);
                expect(query).to.equal(config.assert);
            });
        });
    });
});