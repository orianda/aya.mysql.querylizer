'use strict';

const Table = require('./table');

/**
 * Table row wrapper
 * Support operations on single rows of the table
 */
class Entry {

    /**
     * @constructor
     * @param {string|Table} table
     * @param {string} [id="id"]
     */
    constructor(table, id) {
        this.table = table instanceof Table ? table : new Table(table);
        this.id = id || 'id';
    }

    /**
     * Entry exists?
     * @param {string|number} id
     * @returns {string}
     */
    has(id) {
        return this.table.count({
            [this.id]: id,
        }, 1);
    }

    /**
     * Get entry
     * @param {string|number} id
     * @param {string[]} [names]
     * @returns {string}
     */
    get (id, names) {
        return this.table.select(names, {
            [this.id]: id,
        }, 1);
    }

    /**
     * Create or replace entry
     * @param {string|number} id
     * @param {Object} [values]
     * @returns {string}
     */
    set (id, values) {
        values = values || {};
        values[this.id] = id;
        return this.table.replace(values);
    }

    /**
     * Add entry
     * @param {Object} values
     * @returns {string}
     */
    add(values) {
        delete values[this.id];
        return this.table.insert(values);
    }

    /**
     * Update entry
     * @param {string|number} id
     * @param {Object} values
     * @returns {string}
     */
    mod(id, values) {
        return this.table.update(values, {
            [this.id]: id,
        }, 1);
    }

    /**
     * Delete entry
     * @param {string|number} id
     * @returns {string}
     */
    rid(id) {
        return this.table.remove({
            [this.id]: id,
        }, 1);
    }
}

module.exports = Entry;