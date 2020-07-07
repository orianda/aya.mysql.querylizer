import {expect} from "chai";
import formatLimit from "./limit";

describe('LIMIT', () => {

  [
    {
      amount: undefined,
      offset: undefined,
      assert: ''
    },
    {
      amount: undefined,
      offset: 0,
      assert: ''
    },
    {
      amount: undefined,
      offset: 1,
      assert: 'LIMIT OFFSET 1'
    },
    {
      amount: 0,
      offset: undefined,
      assert: ''
    },
    {
      amount: 0,
      offset: 0,
      assert: ''
    },
    {
      amount: 0,
      offset: 1,
      assert: 'LIMIT OFFSET 1'
    },
    {
      amount: 1,
      offset: undefined,
      assert: 'LIMIT 1'
    },
    {
      amount: 1,
      offset: 0,
      assert: 'LIMIT 1'
    },
    {
      amount: 1,
      offset: 1,
      assert: 'LIMIT 1, 1'
    }
  ].forEach(({amount, offset, assert}) => {

    describe(JSON.stringify({amount, offset}), () => {

      it(`should be "${assert}"`, () => {
        const query = formatLimit(amount, offset);
        expect(query).to.equal(assert);
      });
    });
  });
});
