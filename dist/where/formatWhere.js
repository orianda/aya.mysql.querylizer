"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWhere = void 0;
const name_1 = __importDefault(require("../name"));
const isObject_1 = require("../util/isObject");
const types_1 = require("./types");
const whereValue_1 = require("./whereValue");
const formatWhere = (where) => {
    if (!isObject_1.isObject(where)) {
        return '';
    }
    const queries = {
        [types_1.WhereModeDto.or]: [],
        [types_1.WhereModeDto.and]: [],
        [types_1.WhereModeDto.not]: []
    };
    Object
        .keys(where)
        .forEach((key) => {
        const value = where[key];
        let mode;
        let list;
        if (key === '' ||
            key === types_1.WhereModeDto.or ||
            key === types_1.WhereModeDto.and ||
            key === types_1.WhereModeDto.not) {
            mode = key || types_1.WhereModeDto.or;
            const wheres = Array.isArray(value) ? value : [];
            list = wheres.map(exports.formatWhere);
        }
        else {
            const [, prefix = types_1.WhereModeDto.or, name] = key.match(/^([*+-])?(.*)$/) || [];
            const negate = prefix === types_1.WhereModeDto.not;
            mode = negate ? types_1.WhereModeDto.and : prefix;
            const query = whereValue_1.whereValue(value, negate);
            list = query ? [`${name_1.default(name)} ${query}`] : [];
        }
        queries[mode].push(...list);
    });
    return Object
        .keys(queries)
        .map((key) => {
        const mode = key;
        const list = queries[mode].filter((item) => !!item);
        if (list.length === 0) {
            return '';
        }
        if (mode === types_1.WhereModeDto.and) {
            return list.join(' AND ');
        }
        if (mode === types_1.WhereModeDto.not) {
            return `NOT (${list.join(' OR ')})`;
        }
        if (list.length === 1) {
            return list[0];
        }
        return `(${list.join(' OR ')})`;
    })
        .filter((query) => !!query)
        .join(' AND ');
};
exports.formatWhere = formatWhere;
