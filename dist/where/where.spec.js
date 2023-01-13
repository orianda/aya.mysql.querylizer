"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const where_1 = require("./where");
describe('WHERE', () => {
    describe('undefined', () => {
        it('should be empty', () => {
            const query = (0, where_1.where)(undefined);
            (0, chai_1.expect)(query).to.equal('');
        });
    });
    describe('{}', () => {
        it('should be empty', () => {
            const query = (0, where_1.where)({});
            (0, chai_1.expect)(query).to.equal('');
        });
    });
    describe('undefined values', () => {
        it('should search for unfilled values', () => {
            const query = (0, where_1.where)({
                'name1': undefined,
                '+name2': undefined,
                '-name3': undefined,
                '*name4': undefined
            });
            (0, chai_1.expect)(query).to.equal('WHERE (`name1` IS NULL OR `name4` IS NULL) AND `name2` IS NULL AND `name3` IS NOT NULL');
        });
    });
    describe('single params order', () => {
        it('should work', () => {
            const query = (0, where_1.where)({
                'name1': 0,
                '+name2': 1,
                '-name3': 2,
                '*name4': 3
            });
            (0, chai_1.expect)(query).to.equal('WHERE (`name1` = 0 OR `name4` = 3) AND `name2` = 1 AND `name3` <> 2');
        });
    });
    describe('double params order', () => {
        it('should work', () => {
            const query = (0, where_1.where)({
                'name1': 0,
                '+name2': 1,
                '-name3': 2,
                '*name4': 3,
                'name5': 4,
                '+name6': 5,
                '-name7': 6,
                '*name8': 7
            });
            (0, chai_1.expect)(query).to.equal('WHERE (`name1` = 0 OR `name4` = 3 OR `name5` = 4 OR `name8` = 7) AND `name2` = 1 AND `name3` <> 2 AND `name6` = 5 AND `name7` <> 6');
        });
    });
    describe('boolean', () => {
        it('should be normalized', () => {
            const query = (0, where_1.where)({
                'name1': true,
                '+name2': 'true',
                '-name3': 'TRUE',
                '*name4': true,
                'name5': false,
                '+name6': 'false',
                '-name7': 'FALSE',
                '*name8': false
            });
            (0, chai_1.expect)(query).to.equal('WHERE ' +
                '(`name1` = TRUE OR `name4` = TRUE OR `name5` = FALSE OR `name8` = FALSE) AND ' +
                '`name2` = "true" AND ' +
                '`name3` <> "TRUE" AND ' +
                '`name6` = "false" AND ' +
                '`name7` <> "FALSE"');
        });
    });
    describe('between', () => {
        it('should be a range', () => {
            const query = (0, where_1.where)({
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
            (0, chai_1.expect)(query).to.equal('WHERE `name4` BETWEEN 3 AND 4 AND `name2` >= 1 AND `name3` > 2');
        });
    });
    describe('collection', () => {
        it('should be empty', () => {
            const query = (0, where_1.where)({
                'name1': [],
                '+name2': [undefined],
                '-name3': [1],
                '*name4': [2, 3]
            });
            (0, chai_1.expect)(query).to.equal('WHERE `name4` IN (2, 3) AND `name2` IN (NULL) AND `name3` NOT IN (1)');
        });
    });
    describe('invalid collections 1', () => {
        it('should be empty', () => {
            const query = (0, where_1.where)({
                '': 0,
                '+': 1,
                '-': 2,
                '*': 3
            });
            (0, chai_1.expect)(query).to.equal('');
        });
    });
    describe('invalid collections 2', () => {
        it('should be empty', () => {
            const query = (0, where_1.where)({
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
            (0, chai_1.expect)(query).to.equal('');
        });
    });
    describe('invalid collection values', () => {
        it('should be empty', () => {
            const query = (0, where_1.where)({
                '': [undefined, 1, true, false, '', ' ', 'value', [], {}],
                '+': [undefined, 1, true, false, '', ' ', 'value', [], {}],
                '-': [undefined, 1, true, false, '', ' ', 'value', [], {}],
                '*': [undefined, 1, true, false, '', ' ', 'value', [], {}]
            });
            (0, chai_1.expect)(query).to.equal('');
        });
    });
    describe('valid collection', () => {
        it('should be formatted', () => {
            const query = (0, where_1.where)({
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
            (0, chai_1.expect)(query).to.equal('WHERE ' +
                '((`name10` = 10 OR `name13` = 13) AND `name11` = 11 AND `name12` <> 12 OR ' +
                '(`name20` = 20 OR `name23` = 23) AND `name21` = 21 AND `name22` <> 22 OR ' +
                '(`name70` = 70 OR `name73` = 73) AND `name71` = 71 AND `name72` <> 72 OR ' +
                '(`name80` = 80 OR `name83` = 83) AND `name81` = 81 AND `name82` <> 82) AND ' +
                '(`name30` = 30 OR `name33` = 33) AND `name31` = 31 AND `name32` <> 32 AND ' +
                '(`name40` = 40 OR `name43` = 43) AND `name41` = 41 AND `name42` <> 42 AND ' +
                'NOT ((`name50` = 50 OR `name53` = 53) AND `name51` = 51 AND `name52` <> 52 OR (`name60` = 60 OR `name63` = 63) AND `name61` = 61 AND `name62` <> 62)');
        });
    });
    describe('NULL', () => {
        it('should be NULL', () => {
            const query = (0, where_1.where)({
                'name1': undefined,
                '+name2': undefined,
                '-name3': undefined,
                '*name4': undefined
            });
            (0, chai_1.expect)(query).to.equal('WHERE (`name1` IS NULL OR `name4` IS NULL) AND `name2` IS NULL AND `name3` IS NOT NULL');
        });
    });
    describe('Date', () => {
        it('should be formatted', () => {
            const date = new Date(1502579091963);
            const query = (0, where_1.where)({
                name1: date,
                name2: [date],
                name3: {
                    min: date
                },
                name4: {
                    max: date
                },
                name5: {
                    min: date,
                    max: date
                }
            });
            (0, chai_1.expect)(query).to.equal('WHERE (' +
                '`name1` = "2017-08-12T23:04:51.963Z" OR ' +
                '`name2` IN ("2017-08-12T23:04:51.963Z") OR ' +
                '`name3` >= "2017-08-12T23:04:51.963Z" OR ' +
                '`name4` <= "2017-08-12T23:04:51.963Z" OR ' +
                '`name5` BETWEEN "2017-08-12T23:04:51.963Z" AND "2017-08-12T23:04:51.963Z")');
        });
    });
    describe('BETWEEN', () => {
        it('should be min', () => {
            const query = (0, where_1.where)({
                'name1': {
                    min: 10
                },
                '+name2': {
                    min: 10
                },
                '-name3': {
                    min: 10
                },
                '*name4': {
                    min: 10
                }
            });
            (0, chai_1.expect)(query).to.equal('WHERE (`name1` >= 10 OR `name4` >= 10) AND `name2` >= 10 AND `name3` < 10');
        });
        it('should be max', () => {
            const query = (0, where_1.where)({
                'name1': {
                    max: 10
                },
                '+name2': {
                    max: 10
                },
                '-name3': {
                    max: 10
                },
                '*name4': {
                    max: 10
                }
            });
            (0, chai_1.expect)(query).to.equal('WHERE (`name1` <= 10 OR `name4` <= 10) AND `name2` <= 10 AND `name3` > 10');
        });
        it('should be in between', () => {
            const query = (0, where_1.where)({
                'name1': {
                    min: 10,
                    max: 10
                },
                '+name2': {
                    min: 10,
                    max: 10
                },
                '-name3': {
                    min: 10,
                    max: 10
                },
                '*name4': {
                    min: 10,
                    max: 10
                }
            });
            (0, chai_1.expect)(query).to.equal('WHERE (`name1` BETWEEN 10 AND 10 OR `name4` BETWEEN 10 AND 10) AND `name2` BETWEEN 10 AND 10 AND `name3` NOT BETWEEN 10 AND 10');
        });
    });
});
