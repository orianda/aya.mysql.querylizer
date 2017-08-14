'use strict';

const expect = require('chai').expect;
const Entry = require('../src/entry');
const Table = require('../src/table');

describe('Entry', function () {

    describe('constructor', function () {

        it('should have table property', function () {
            const entry = new Entry('table');
            expect(entry.table).to.be.instanceOf(Table);
            expect(entry.table.name).to.equal('table');
        });

        it('should accept table', function () {
            const entry = new Entry(new Table('table'));
            expect(entry.table).to.be.instanceOf(Table);
            expect(entry.table.name).to.equal('table');
        });

        it('should accpet id', function () {
            const entry = new Entry('table', 'uuid');
            expect(entry.id).to.equal('uuid');
        });

        it('should fallback id', function () {
            const entry = new Entry('table');
            expect(entry.id).to.equal('id');
        });
    });

    describe('instance', function () {
        let entry;

        beforeEach(function () {
            entry = new Entry('table');
        });

        describe('has', function () {
            it('should check', function () {
                const query = entry.has('12');
                expect(query).to.equal('SELECT COUNT(*) AS `amount` FROM `table` WHERE `id` = "12" LIMIT 1');
            });
        });

        describe('get', function () {

            it('should fetch all columns', function () {
                const query = entry.get('12');
                expect(query).to.equal('SELECT * FROM `table` WHERE `id` = "12" LIMIT 1');
            });

            it('should fetch given columns', function () {
                const query = entry.get('12', ['some', 'columns']);
                expect(query).to.equal('SELECT `some`, `columns` FROM `table` WHERE `id` = "12" LIMIT 1');
            });
        });

        describe('set', function () {

            it('should set values', function () {
                const query = entry.set('12', {
                    some: 'value'
                });
                expect(query).to.equal('REPLACE `table` SET `some` = "value", `id` = "12"');
            });

            it('should set id only', function () {
                const query = entry.set('12');
                expect(query).to.equal('REPLACE `table` SET `id` = "12"');
            });
        });

        describe('add', function () {

            it('should insert values', function () {
                const query = entry.add({
                    some: 'value'
                });
                expect(query).to.equal('INSERT INTO `table` SET `some` = "value"');
            });
        });

        describe('mod', function () {

            it('should update', function () {
                const query = entry.mod('12', {
                    some: 'value'
                });
                expect(query).to.equal('UPDATE `table` SET `some` = "value" WHERE `id` = "12" LIMIT 1');
            });
        });

        describe('rid', function () {

            it('should remove', function () {
                const query = entry.rid('12');
                expect(query).to.equal('DELETE FROM `table` WHERE `id` = "12" LIMIT 1');
            });
        });
    });
});