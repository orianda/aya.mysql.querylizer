import {expect} from "chai";
import formatName from "./name";
import {NameDto} from "./name.dto";

describe('NAME', () => {

  [
    {
      name: undefined,
      assert: ''
    },
    {
      name: '',
      assert: '``'
    },
    {
      name: ' ',
      assert: '` `'
    },
    {
      name: 'name',
      assert: '`name`'
    },
    {
      name: NaN,
      assert: ''
    },
    {
      name: 1,
      assert: '`1`'
    },
    {
      name: null,
      assert: ''
    },
    {
      name: {},
      assert: ''
    }
  ].forEach(({name, assert}) => {

    describe(String(JSON.stringify(name)), () => {

      it(`should be "${JSON.stringify(name)}"`, () => {
        const query = formatName(name as NameDto);
        expect(query).to.equal(assert);
      });
    });
  });
});
