'use strict';

const formatName = require('./name');
const formatNames = require('./names');
const formatWhere = require('./where');
const formatLimit = require('./limit');
const formatOrder = require('./order');
const formatValues = require('./values');

/**
 * Joins arguments to string
 * @returns {string}
 */
function join() {
    return Array.from(arguments)
        .map((argument) => argument.trim())
        .filter((argument) => argument.length)
        .join(' ');
}

/**
 * Table wrapper
 * Provides operations on multiple rows of the table
 */
class Table {

    /**
     * @constructor
     * @param {string} name
     */
    constructor(name) {
        this.name = name;
    }

    /**
     * Count affected rows
     * @param {object} [where=null]
     * @param {number} [amount=0]
     * @param {number} [offset=0]
     * @returns {string}
     */
    count(where, amount, offset) {
        return join(
            'SELECT',
            'COUNT(*) AS `amount`',
            'FROM ' + formatName(this.name),
            formatWhere(where),
            formatLimit(amount, offset)
        );
    }

    /**
     * Select rows
     * @param {string[]} [names=[]]
     * @param {object} [where=null]
     * @param {number} [amount=0]
     * @param {number} [offset=0]
     * @param {Array} [order=[]]
     * @returns {string}
     */
    select(names, where, amount, offset, order) {
        return join(
            'SELECT',
            formatNames(names),
            'FROM ' + formatName(this.name),
            formatWhere(where),
            formatOrder(order),
            formatLimit(amount, offset)
        );
    }

    /**
     * Inserts new row
     * @param {Object} values
     * @returns {string}
     */
    insert(values) {
        const query = formatValues(values);
        return query && join(
            'INSERT INTO ' + formatName(this.name),
            query
        );
    }

    /**
     * Update rows
     * @param {Object} values
     * @param {object} [where=null]
     * @param {number} [amount=0]
     * @param {number} [offset=0]
     * @param {Array} [order=[]]
     * @returns {string}
     */
    update(values, where, amount, offset, order) {
        const query = formatValues(values);
        return query && join(
            'UPDATE ' + formatName(this.name),
            query,
            formatWhere(where),
            formatOrder(order),
            formatLimit(amount, offset)
        );
    }

    /**
     * Replace rows
     * @param {Object} values
     * @param {object} [where=null]
     * @param {number} [amount=0]
     * @param {number} [offset=0]
     * @param {Array} [order=[]]
     * @returns {string}
     */
    replace(values, where, amount, offset, order) {
        const query = formatValues(values);
        return query && join(
            'REPLACE ' + formatName(this.name),
            query,
            formatWhere(where),
            formatOrder(order),
            formatLimit(amount, offset)
        );
    }

    /**
     * Remove rows
     * @param {object} [where=null]
     * @param {number} [amount=0]
     * @param {number} [offset=0]
     * @param {Array} [order=[]]
     * @returns {string}
     */
    remove(where, amount, offset, order) {
        return join(
            'DELETE FROM ' + formatName(this.name),
            formatWhere(where),
            formatOrder(order),
            formatLimit(amount, offset)
        );
    }
}

module.exports = Table;