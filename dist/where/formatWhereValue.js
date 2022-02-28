"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWhereValue = void 0;
const name_1 = __importDefault(require("../name"));
const types_1 = require("./types");
const whereValue_1 = require("./whereValue");
const formatWhereValue = (key, value) => {
    const [, mode = types_1.WhereModeDto.or, name] = key.match(/^([*+-])?(.*)$/) || [];
    const negate = mode === types_1.WhereModeDto.not;
    const query = whereValue_1.whereValue(value, negate);
    return {
        mode: negate ? types_1.WhereModeDto.and : mode,
        queries: query ? [`${name_1.default(name)} ${query}`] : []
    };
};
exports.formatWhereValue = formatWhereValue;