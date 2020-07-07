import {expect} from "chai";
import formatNames from "./names";
import {NamesDto} from "./names.dto";

describe('NAMES', () => {

  [
    {
      names: undefined,
      assert: '*'
    },
    {
      names: true,
      assert: '*'
    },
    {
      names: false,
      assert: '*'
    },
    {
      names: 1,
      assert: '`1`'
    },
    {
      names: -1,
      assert: '`-1`'
    },
    {
      names: NaN,
      assert: '*'
    },
    {
      names: -NaN,
      assert: '*'
    },
    {
      names: Infinity,
      assert: '*'
    },
    {
      names: -Infinity,
      assert: '*'
    },
    {
      names: -Infinity,
      assert: '*'
    },
    {
      names: '',
      assert: '``'
    },
    {
      names: ' ',
      assert: '` `'
    },
    {
      names: 'name',
      assert: '`name`'
    },
    {
      names: null,
      assert: '*'
    },
    {
      names: [],
      assert: '*'
    },
    {
      names: [undefined, '', ' '],
      assert: '``, ` `'
    },
    {
      names: ['name'],
      assert: '`name`'
    },
    {
      names: ['name', 'name', 'name'],
      assert: '`name`'
    },
    {
      names: ['name1', 'name2', 'name3'],
      assert: '`name1`, `name2`, `name3`'
    },
    {
      names: [1, 2, 3, NaN],
      assert: '`1`, `2`, `3`'
    },
    {
      names: [true, false],
      assert: '*'
    },
    {
      names: [{}, []],
      assert: '*'
    },
    {
      names: [{a: 1}, [1, 2]],
      assert: '*'
    }
  ].forEach(({names, assert}) => {

    describe(String(JSON.stringify(names)), () => {

      it(`should be "${assert}"`, () => {
        const query = formatNames(names as NamesDto);
        expect(query).to.equal(assert);
      });
    });
  });
});
