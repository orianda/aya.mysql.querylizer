'use strict';

const expect = require('chai').expect;
const Table = require('../src/table');

describe('Table', function () {
    let table;

    beforeEach(function () {
        table = new Table('table');
    });

    it('should have name', function () {
        expect(table.name).to.equal('table');
    });

    describe('count', function () {

        it('should count all', function () {
            const query = table.count();
            expect(query).to.equal('SELECT COUNT(*) AS `amount` FROM `table`');
        });

        it('should count specific', function () {
            const query = table.count({
                some: 'filter'
            });
            expect(query).to.equal('SELECT COUNT(*) AS `amount` FROM `table` WHERE `some` = "filter"');
        });

        it('should count limit', function () {
            const query = table.count(null, 10, 5);
            expect(query).to.equal('SELECT COUNT(*) AS `amount` FROM `table` LIMIT 5, 10');
        });

        it('should count complete', function () {
            const query = table.count({
                some: 'filter'
            }, 10, 5);
            expect(query).to.equal('SELECT COUNT(*) AS `amount` FROM `table` WHERE `some` = "filter" LIMIT 5, 10');
        });
    });

    describe('select', function () {

        it('should select all', function () {
            const query = table.select();
            expect(query).to.equal('SELECT * FROM `table`');
        });

        it('should select given columns', function () {
            const query = table.select(['some', 'cols']);
            expect(query).to.equal('SELECT `some`, `cols` FROM `table`');
        });

        it('should select specific', function () {
            const query = table.select(null, {
                some: 'filter'
            });
            expect(query).to.equal('SELECT * FROM `table` WHERE `some` = "filter"');
        });

        it('should select limit', function () {
            const query = table.select(null, null, 10, 5);
            expect(query).to.equal('SELECT * FROM `table` LIMIT 5, 10');
        });

        it('should select ordered', function () {
            const query = table.select(null, null, 0, 0, ['order']);
            expect(query).to.equal('SELECT * FROM `table` ORDER BY `order` ASC');
        });

        it('should select complete', function () {
            const query = table.select(['some', 'cols'], {
                some: 'filter'
            }, 10, 5, ['order']);
            expect(query).to.equal('SELECT `some`, `cols` FROM `table` WHERE `some` = "filter" ORDER BY `order` ASC LIMIT 5, 10');
        });
    });

    describe('insert', function () {

        it('should insert values', function () {
            const query = table.insert({
                some: 'value'
            });
            expect(query).to.equal('INSERT INTO `table` SET `some` = "value"');
        });

        it('should not insert by empty object', function () {
            const query = table.insert({});
            expect(query).to.equal('');
        });

        it('should not insert by null', function () {
            const query = table.insert(null);
            expect(query).to.equal('');
        });
    });

    describe('update', function () {

        it('should update nothing', function () {
            const query = table.update();
            expect(query).to.equal('');
        });

        it('should update all', function () {
            const query = table.update({
                some: 'value'
            });
            expect(query).to.equal('UPDATE `table` SET `some` = "value"');
        });

        it('should update specific', function () {
            const query = table.update({
                some: 'value'
            }, {
                some: 'filter'
            });
            expect(query).to.equal('UPDATE `table` SET `some` = "value" WHERE `some` = "filter"');
        });

        it('should update limit', function () {
            const query = table.update({
                some: 'value'
            }, null, 10, 5);
            expect(query).to.equal('UPDATE `table` SET `some` = "value" LIMIT 5, 10');
        });

        it('should update ordered', function () {
            const query = table.update({
                some: 'value'
            }, null, 0, 0, ['order']);
            expect(query).to.equal('UPDATE `table` SET `some` = "value" ORDER BY `order` ASC');
        });

        it('should update complete', function () {
            const query = table.update({
                some: 'value'
            }, {
                some: 'filter'
            }, 10, 5, ['order']);
            expect(query).to.equal('UPDATE `table` SET `some` = "value" WHERE `some` = "filter" ORDER BY `order` ASC LIMIT 5, 10');
        });
    });

    describe('replace', function () {

        it('should replace nothing', function () {
            const query = table.replace();
            expect(query).to.equal('');
        });

        it('should replace all', function () {
            const query = table.replace({
                some: 'value'
            });
            expect(query).to.equal('REPLACE `table` SET `some` = "value"');
        });

        it('should replace specific', function () {
            const query = table.replace({
                some: 'value'
            }, {
                some: 'filter'
            });
            expect(query).to.equal('REPLACE `table` SET `some` = "value" WHERE `some` = "filter"');
        });

        it('should replace limit', function () {
            const query = table.replace({
                some: 'value'
            }, null, 10, 5);
            expect(query).to.equal('REPLACE `table` SET `some` = "value" LIMIT 5, 10');
        });

        it('should replace ordered', function () {
            const query = table.replace({
                some: 'value'
            }, null, 0, 0, ['order']);
            expect(query).to.equal('REPLACE `table` SET `some` = "value" ORDER BY `order` ASC');
        });

        it('should replace complete', function () {
            const query = table.replace({
                some: 'value'
            }, {
                some: 'filter'
            }, 10, 5, ['order']);
            expect(query).to.equal('REPLACE `table` SET `some` = "value" WHERE `some` = "filter" ORDER BY `order` ASC LIMIT 5, 10');
        });
    });

    describe('remove', function () {

        it('should remove all', function () {
            const query = table.remove();
            expect(query).to.equal('DELETE FROM `table`');
        });

        it('should remove specific', function () {
            const query = table.remove({
                some: 'filter'
            });
            expect(query).to.equal('DELETE FROM `table` WHERE `some` = "filter"');
        });

        it('should remove limit', function () {
            const query = table.remove(null, 10, 5);
            expect(query).to.equal('DELETE FROM `table` LIMIT 5, 10');
        });

        it('should remove ordered', function () {
            const query = table.remove(null, 0, 0, ['order']);
            expect(query).to.equal('DELETE FROM `table` ORDER BY `order` ASC');
        });

        it('should remove complete', function () {
            const query = table.remove({
                some: 'filter'
            }, 10, 5, ['order']);
            expect(query).to.equal('DELETE FROM `table` WHERE `some` = "filter" ORDER BY `order` ASC LIMIT 5, 10');
        });
    });
});