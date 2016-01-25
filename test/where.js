'use strict';

var expect = require('chai').expect,
    where = require('../src/where');

describe('WHERE', function () {
    describe('undefined', function () {
        it('should be empty', function () {
            var query = where(undefined);
            expect(query).to.deep.equal({
                query: '',
                params: []
            });
        });
    });
    describe('{}', function () {
        it('should be empty', function () {
            var query = where({});
            expect(query).to.deep.equal({
                query: '',
                params: []
            });
        });
    });
    describe('undefined values', function () {
        it('should be empty', function () {
            var query = where({
                'name1': undefined,
                '+name2': undefined,
                '-name3': undefined,
                '*name4': undefined
            });
            expect(query).to.deep.equal({
                query: '',
                params: []
            });
        });
    });
    describe('should have params order', function () {
        it('should work', function () {
            var query = where({
                'name1': 0,
                '+name2': 1,
                '-name3': 2,
                '*name4': 3
            });
            expect(query).to.deep.equal({
                query: 'WHERE `name2` = ? AND `name3` <> ? AND (`name1` = ? OR `name4` = ?)',
                params: [1, 2, 0, 3]
            });
        });
    });
    describe('should have params order of double', function () {
        it('should work', function () {
            var query = where({
                'name1': 0,
                '+name2': 1,
                '-name3': 2,
                '*name4': 3,
                'name5': 4,
                '+name6': 5,
                '-name7': 6,
                '*name8': 7
            });
            expect(query).to.deep.equal({
                query: 'WHERE `name2` = ? AND `name3` <> ? AND `name6` = ? AND `name7` <> ? AND (`name1` = ? OR `name4` = ? OR `name5` = ? OR `name8` = ?)',
                params: [1, 2, 5, 6, 0, 3, 4, 7]
            });
        });
    });
    describe('boolean', function () {
        it('should be normalized', function () {
            var query = where({
                'name1': true,
                '+name2': 'true',
                '-name3': 'TRUE',
                '*name4': true,
                'name5': false,
                '+name6': 'false',
                '-name7': 'FALSE',
                '*name8': false
            });
            expect(query).to.deep.equal({
                query: 'WHERE `name2` = ? AND `name3` <> ? AND `name6` = ? AND `name7` <> ? AND (`name1` = ? OR `name4` = ? OR `name5` = ? OR `name8` = ?)',
                params: [true, true, false, false, true, true, false, false]
            });
        });
    });
    describe('between', function () {
        it('should be a range', function () {
            var query = where({
                'name1': {},
                '+name2': {
                    min: 1
                },
                '-name3': {
                    max: 2
                },
                '*name4': {
                    min: 3,
                    max: 4
                },
                'name5': {
                    min: undefined
                },
                '+name6': {
                    max: undefined
                },
                '-name7': {
                    min: undefined,
                    max: undefined
                }
            });
            expect(query).to.deep.equal({
                query: 'WHERE `name2` >= ? AND `name3` > ? AND `name4` BETWEEN ? AND ?',
                params: [1, 2, 3, 4]
            });
        });
    });
    describe('collection', function () {
        it('should be empty', function () {
            var query = where({
                'name1': [],
                '+name2': [undefined],
                '-name3': [1],
                '*name4': [2, 3]
            });
            expect(query).to.deep.equal({
                query: 'WHERE `name3` NOT IN (?) AND `name4` IN (?, ?)',
                params: [1, 2, 3]
            });
        });
    });
    describe('invalid collections', function () {
        it('should be empty', function () {
            var query = where({
                '': 0,
                '+': 1,
                '-': 2,
                '*': 3
            });
            expect(query).to.deep.equal({
                query: '',
                params: []
            });
        });
    });
    describe('invalid collections 2', function () {
        it('should be empty', function () {
            var query = where({
                '': {
                    'name10': 0,
                    '+name11': 1,
                    '-name12': 2,
                    '*name13': 3
                },
                '+': {
                    'name20': 0,
                    '+name21': 1,
                    '-name22': 2,
                    '*name23': 3
                },
                '-': {
                    'name30': 0,
                    '+name31': 1,
                    '-name32': 2,
                    '*name33': 3
                },
                '*': {
                    'name40': 0,
                    '+name41': 1,
                    '-name42': 2,
                    '*name43': 3
                }
            });
            expect(query).to.deep.equal({
                query: '',
                params: []
            });
        });
    });
    describe('invalid collection values', function () {
        it('should be empty', function () {
            var query = where({
                '': [undefined, 1, true, false, '', ' ', 'value', [], {}],
                '+': [undefined, 1, true, false, '', ' ', 'value', [], {}],
                '-': [undefined, 1, true, false, '', ' ', 'value', [], {}],
                '*': [undefined, 1, true, false, '', ' ', 'value', [], {}]
            });
            expect(query).to.deep.equal({
                query: '',
                params: []
            });
        });
    });
    describe('valid collection', function () {
        it('should be formatted', function () {
            var query = where({
                '': [
                    {
                        'name10': 10,
                        '+name11': 11,
                        '-name12': 12,
                        '*name13': 13
                    },
                    {
                        'name20': 20,
                        '+name21': 21,
                        '-name22': 22,
                        '*name23': 23
                    }
                ],
                '+': [
                    {
                        'name30': 30,
                        '+name31': 31,
                        '-name32': 32,
                        '*name33': 33
                    },
                    {
                        'name40': 40,
                        '+name41': 41,
                        '-name42': 42,
                        '*name43': 43
                    }
                ],
                '-': [
                    {
                        'name50': 50,
                        '+name51': 51,
                        '-name52': 52,
                        '*name53': 53
                    },
                    {
                        'name60': 60,
                        '+name61': 61,
                        '-name62': 62,
                        '*name63': 63
                    }
                ],
                '*': [
                    {
                        'name70': 70,
                        '+name71': 71,
                        '-name72': 72,
                        '*name73': 73
                    },
                    {
                        'name80': 80,
                        '+name81': 81,
                        '-name82': 82,
                        '*name83': 83
                    }
                ]
            });
            expect(query).to.deep.equal({
                query: 'WHERE ' +
                '(`name31` = ? AND `name32` <> ? AND (`name30` = ? OR `name33` = ?)) AND (`name41` = ? AND `name42` <> ? AND (`name40` = ? OR `name43` = ?)) AND ' +
                'NOT ((`name51` = ? AND `name52` <> ? AND (`name50` = ? OR `name53` = ?)) OR (`name61` = ? AND `name62` <> ? AND (`name60` = ? OR `name63` = ?))) AND ' +
                '((`name11` = ? AND `name12` <> ? AND (`name10` = ? OR `name13` = ?)) OR ' +
                '(`name21` = ? AND `name22` <> ? AND (`name20` = ? OR `name23` = ?)) OR ' +
                '(`name71` = ? AND `name72` <> ? AND (`name70` = ? OR `name73` = ?)) OR ' +
                '(`name81` = ? AND `name82` <> ? AND (`name80` = ? OR `name83` = ?)))',
                params: [31, 32, 30, 33, 41, 42, 40, 43, 51, 52, 50, 53, 61, 62, 60, 63, 11, 12, 10, 13, 21, 22, 20, 23, 71, 72, 70, 73, 81, 82, 80, 83]
            });
        });
    });
});