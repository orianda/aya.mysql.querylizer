"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const name_1 = __importDefault(require("./name"));
exports.default = (names = []) => (Array.isArray(names) ? names : [names])
    .map(name_1.default)
    .filter((name) => !!name)
    .filter((name, index, list) => list.indexOf(name) === index)
    .join(', ') || '*';
