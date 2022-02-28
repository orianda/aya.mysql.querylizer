import {expect} from "chai";
import {Entry, limit, name, names, order, Table, value, values, where} from ".";
import libName from "./name";
import libNames from "./names";
import libValue from "./value";
import libValues from "./values";
import {where as libWhere} from "./where";
import libOrder from "./order";
import libLimit from "./limit";
import libTable from "./Table";
import libEntry from "./Entry";

describe('index', () => {
  const srv: {
    [name: string]: unknown;
  } = {name, names, value, values, where, order, limit, Table, Entry};
  const lib: {
    [name: string]: unknown;
  } = {
    name: libName,
    names: libNames,
    value: libValue,
    values: libValues,
    where: libWhere,
    order: libOrder,
    limit: libLimit,
    Table: libTable,
    Entry: libEntry
  };

  Object
    .keys(srv)
    .forEach((name) => {

      it(`should have ${name}`, () => {
        expect(srv[name]).to.equal(lib[name]);
      });
    });
});
