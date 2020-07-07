"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Entry {
    constructor(table, id) {
        this.table = table;
        this.id = id;
    }
    has(id) {
        return this.table.count({
            [this.id]: id,
        }, 1);
    }
    get(id, names) {
        return this.table.select(names, {
            [this.id]: id,
        }, 1);
    }
    set(id, values = {}) {
        values[this.id] = id;
        return this.table.replace(values);
    }
    add(values = {}) {
        delete values[this.id];
        return this.table.insert(values);
    }
    mod(id, values) {
        return this.table.update(values, {
            [this.id]: id,
        }, 1);
    }
    rid(id) {
        return this.table.remove({
            [this.id]: id,
        }, 1);
    }
}
exports.default = Entry;
