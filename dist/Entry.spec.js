"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Entry_1 = __importDefault(require("./Entry"));
const Table_1 = __importDefault(require("./Table"));
describe('Entry', () => {
    describe('constructor', () => {
        it('should have table property', () => {
            const table = new Table_1.default('table');
            const entry = new Entry_1.default(table, 'id');
            (0, chai_1.expect)(entry.table).to.be.instanceOf(Table_1.default);
            (0, chai_1.expect)(entry.table.name).to.equal('table');
        });
        it('should accept table', () => {
            const table = new Table_1.default('table');
            const entry = new Entry_1.default(table, 'id');
            (0, chai_1.expect)(entry.table).to.be.instanceOf(Table_1.default);
            (0, chai_1.expect)(entry.table.name).to.equal('table');
        });
        it('should accpet id', () => {
            const table = new Table_1.default('table');
            const entry = new Entry_1.default(table, 'uuid');
            (0, chai_1.expect)(entry.id).to.equal('uuid');
        });
        it('should fallback id', () => {
            const table = new Table_1.default('table');
            const entry = new Entry_1.default(table, 'id');
            (0, chai_1.expect)(entry.id).to.equal('id');
        });
    });
    describe('instance', () => {
        let entry;
        beforeEach(() => {
            const table = new Table_1.default('table');
            entry = new Entry_1.default(table, 'id');
        });
        describe('has', () => {
            it('should check', () => {
                const query = entry.has('12');
                (0, chai_1.expect)(query).to.equal('SELECT COUNT(*) AS `amount` FROM `table` WHERE `id` = "12" LIMIT 1');
            });
        });
        describe('get', () => {
            it('should fetch all columns', () => {
                const query = entry.get('12');
                (0, chai_1.expect)(query).to.equal('SELECT * FROM `table` WHERE `id` = "12" LIMIT 1');
            });
            it('should fetch given columns', () => {
                const query = entry.get('12', ['some', 'columns']);
                (0, chai_1.expect)(query).to.equal('SELECT `some`, `columns` FROM `table` WHERE `id` = "12" LIMIT 1');
            });
        });
        describe('set', () => {
            it('should set values', () => {
                const query = entry.set('12', {
                    some: 'value'
                });
                (0, chai_1.expect)(query).to.equal('REPLACE `table` SET `some` = "value", `id` = "12"');
            });
            it('should set id only', () => {
                const query = entry.set('12');
                (0, chai_1.expect)(query).to.equal('REPLACE `table` SET `id` = "12"');
            });
        });
        describe('add', () => {
            it('should insert values', () => {
                const query = entry.add({
                    some: 'value'
                });
                (0, chai_1.expect)(query).to.equal('INSERT INTO `table` SET `some` = "value"');
            });
            it('should insert empty values', () => {
                const query = entry.add();
                (0, chai_1.expect)(query).to.equal('INSERT INTO `table` () VALUES ()');
            });
        });
        describe('mod', () => {
            it('should update', () => {
                const query = entry.mod('12', {
                    some: 'value'
                });
                (0, chai_1.expect)(query).to.equal('UPDATE `table` SET `some` = "value" WHERE `id` = "12" LIMIT 1');
            });
        });
        describe('rid', () => {
            it('should remove', () => {
                const query = entry.rid('12');
                (0, chai_1.expect)(query).to.equal('DELETE FROM `table` WHERE `id` = "12" LIMIT 1');
            });
        });
    });
});
