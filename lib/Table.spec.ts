import {expect} from "chai";
import Table from "./Table";

describe('Table', () => {

  ['', 'schema'].forEach((schema) => {

    describe('schema = ' + schema, () => {
      let reference: string;
      let table: Table;

      beforeEach(() => {
        reference = schema ? '`schema`.`table`' : '`table`';
        table = new Table('table', schema);
      });

      it('should have name', () => {
        expect(table.name).to.equal('table');
      });

      describe(`count`, () => {

        it(`should count all`, () => {
          const query = table.count();
          expect(query).to.equal(`SELECT COUNT(*) AS \`amount\` FROM ${reference}`);
        });

        it(`should count specific`, () => {
          const query = table.count({
            some: `filter`
          });
          expect(query).to.equal(`SELECT COUNT(*) AS \`amount\` FROM ${reference} WHERE \`some\` = "filter"`);
        });

        it(`should count limit`, () => {
          const query = table.count(undefined, 10, 5);
          expect(query).to.equal(`SELECT COUNT(*) AS \`amount\` FROM ${reference} LIMIT 5, 10`);
        });

        it(`should count complete`, () => {
          const query = table.count({
            some: `filter`
          }, 10, 5);
          expect(query).to.equal(`SELECT COUNT(*) AS \`amount\` FROM ${reference} WHERE \`some\` = "filter" LIMIT 5, 10`);
        });
      });

      describe(`select`, () => {

        it(`should select all`, () => {
          const query = table.select();
          expect(query).to.equal(`SELECT * FROM ${reference}`);
        });

        it(`should select given columns`, () => {
          const query = table.select([`some`, `cols`]);
          expect(query).to.equal(`SELECT \`some\`, \`cols\` FROM ${reference}`);
        });

        it(`should select specific`, () => {
          const query = table.select(undefined, {
            some: `filter`
          });
          expect(query).to.equal(`SELECT * FROM ${reference} WHERE \`some\` = "filter"`);
        });

        it(`should select limit`, () => {
          const query = table.select(undefined, undefined, 10, 5);
          expect(query).to.equal(`SELECT * FROM ${reference} LIMIT 5, 10`);
        });

        it(`should select ordered`, () => {
          const query = table.select(undefined, undefined, 0, 0, [`order`]);
          expect(query).to.equal(`SELECT * FROM ${reference} ORDER BY \`order\` ASC`);
        });

        it(`should select complete`, () => {
          const query = table.select([`some`, `cols`], {
            some: `filter`
          }, 10, 5, [`order`]);
          expect(query).to.equal(`SELECT \`some\`, \`cols\` FROM ${reference} WHERE \`some\` = "filter" ORDER BY \`order\` ASC LIMIT 5, 10`);
        });
      });

      describe(`insert`, () => {

        it(`should insert values`, () => {
          const query = table.insert({
            some: `value`
          });
          expect(query).to.equal(`INSERT INTO ${reference} SET \`some\` = "value"`);
        });

        it(`should not insert by empty object`, () => {
          const query = table.insert({});
          expect(query).to.equal(`INSERT INTO ${reference} () VALUES ()`);
        });

        it(`should not insert by undefined`, () => {
          const query = table.insert(undefined);
          expect(query).to.equal(`INSERT INTO ${reference} () VALUES ()`);
        });
      });

      describe(`update`, () => {

        it(`should update nothing`, () => {
          const query = table.update();
          expect(query).to.equal(``);
        });

        it(`should update all`, () => {
          const query = table.update({
            some: `value`
          });
          expect(query).to.equal(`UPDATE ${reference} SET \`some\` = "value"`);
        });

        it(`should update specific`, () => {
          const query = table.update({
            some: `value`
          }, {
            some: `filter`
          });
          expect(query).to.equal(`UPDATE ${reference} SET \`some\` = "value" WHERE \`some\` = "filter"`);
        });

        it(`should update limit`, () => {
          const query = table.update({
            some: `value`
          }, undefined, 10, 5);
          expect(query).to.equal(`UPDATE ${reference} SET \`some\` = "value" LIMIT 5, 10`);
        });

        it(`should update ordered`, () => {
          const query = table.update({
            some: `value`
          }, undefined, 0, 0, [`order`]);
          expect(query).to.equal(`UPDATE ${reference} SET \`some\` = "value" ORDER BY \`order\` ASC`);
        });

        it(`should update complete`, () => {
          const query = table.update({
            some: `value`
          }, {
            some: `filter`
          }, 10, 5, [`order`]);
          expect(query).to.equal(`UPDATE ${reference} SET \`some\` = "value" WHERE \`some\` = "filter" ORDER BY \`order\` ASC LIMIT 5, 10`);
        });
      });

      describe(`replace`, () => {

        it(`should replace nothing`, () => {
          const query = table.replace();
          expect(query).to.equal(``);
        });

        it(`should replace all`, () => {
          const query = table.replace({
            some: `value`
          });
          expect(query).to.equal(`REPLACE ${reference} SET \`some\` = "value"`);
        });

        it(`should replace specific`, () => {
          const query = table.replace({
            some: `value`
          }, {
            some: `filter`
          });
          expect(query).to.equal(`REPLACE ${reference} SET \`some\` = "value" WHERE \`some\` = "filter"`);
        });

        it(`should replace limit`, () => {
          const query = table.replace({
            some: `value`
          }, undefined, 10, 5);
          expect(query).to.equal(`REPLACE ${reference} SET \`some\` = "value" LIMIT 5, 10`);
        });

        it(`should replace ordered`, () => {
          const query = table.replace({
            some: `value`
          }, undefined, 0, 0, [`order`]);
          expect(query).to.equal(`REPLACE ${reference} SET \`some\` = "value" ORDER BY \`order\` ASC`);
        });

        it(`should replace complete`, () => {
          const query = table.replace({
            some: `value`
          }, {
            some: `filter`
          }, 10, 5, [`order`]);
          expect(query).to.equal(`REPLACE ${reference} SET \`some\` = "value" WHERE \`some\` = "filter" ORDER BY \`order\` ASC LIMIT 5, 10`);
        });
      });

      describe(`remove`, () => {

        it(`should remove all`, () => {
          const query = table.remove();
          expect(query).to.equal(`DELETE FROM ${reference}`);
        });

        it(`should remove specific`, () => {
          const query = table.remove({
            some: `filter`
          });
          expect(query).to.equal(`DELETE FROM ${reference} WHERE \`some\` = "filter"`);
        });

        it(`should remove limit`, () => {
          const query = table.remove(undefined, 10, 5);
          expect(query).to.equal(`DELETE FROM ${reference} LIMIT 5, 10`);
        });

        it(`should remove ordered`, () => {
          const query = table.remove(undefined, 0, 0, [`order`]);
          expect(query).to.equal(`DELETE FROM ${reference} ORDER BY \`order\` ASC`);
        });

        it(`should remove complete`, () => {
          const query = table.remove({
            some: `filter`
          }, 10, 5, [`order`]);
          expect(query).to.equal(`DELETE FROM ${reference} WHERE \`some\` = "filter" ORDER BY \`order\` ASC LIMIT 5, 10`);
        });
      });
    });
  });
});
