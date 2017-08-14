'use strict';

const expect = require('chai').expect;
const formatNames = require('../src/names');

describe('NAMES', function () {

  [
    {
      names: undefined,
      assert: '*'
    },
    {
      names: [],
      assert: '*'
    },
    {
      names: [undefined, '', ' '],
      assert: '` `'
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
      assert: '`[object Object]`'
    },
    {
      names: [{a: 1}, [1, 2]],
      assert: '`[object Object]`, `1,2`'
    }
  ].forEach(function (config) {

    describe(String(JSON.stringify(config.names)), function () {

      it('should be "' + config.assert + '"', function () {
        const query = formatNames(config.names);
        expect(query).to.equal(config.assert);
      });
    });
  });
});