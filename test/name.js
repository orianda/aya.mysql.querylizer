'use strict';

const expect = require('chai').expect;
const formatName = require('../src/name');

describe('NAME', function () {

  [
    {
      name: undefined,
      assert: ''
    },
    {
      name: '',
      assert: ''
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
      assert: '`[object Object]`'
    }
  ].forEach(function (config) {

    describe(String(JSON.stringify(config.name)), function () {

      it('should be "' + config.assert + '"', function () {
        const query = formatName(config.name);
        expect(query).to.equal(config.assert);
      });
    });
  });
});