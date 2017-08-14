'use strict';

const expect = require('chai').expect;
const formatValues = require('../src/values');

describe('VALUES', function () {

  describe('names', function () {

    [
      {
        names: undefined,
        assert: ''
      },
      {
        names: {},
        assert: ''
      },
      {
        names: {
          '': '',
          ' ': ' '
        },
        assert: 'SET ` ` = " "'
      },
      {
        names: {
          name: 'value'
        },
        assert: 'SET `name` = "value"'
      },
      {
        names: {
          name1: 'value1',
          name2: 'value2',
          name3: 'value3'
        },
        assert: 'SET `name1` = "value1", `name2` = "value2", `name3` = "value3"'
      }
    ].forEach(function (config) {

      describe(String(JSON.stringify(config.names)), function () {

        it('should be "' + config.assert[0] + '"', function () {
          const query = formatValues(config.names);
          expect(query).to.deep.equal(config.assert);
        });
      });
    });
  });

  describe('boolean', function () {

    [true, false].forEach(function (value) {
      [value, value.toString(), value.toString().toUpperCase()].forEach(function (input) {

        describe(typeof input + ' - ' + input, function () {

          it('should be ' + value, function () {
            const query = formatValues({names: input});
            const value = typeof input === 'string' ? '"' + input + '"' : input.toString().toUpperCase();
            expect(query).to.deep.equal('SET `names` = ' + value);
          });
        });
      });
    });
  });

  describe('numbers', function () {

    [0, 1.1, 1.1E1, 1.1E+1, 1.1E-1].forEach(function (value) {
      ['', '+', '-'].forEach(function (sign) {
        const output = parseFloat(sign + value);
        [output, sign + value].forEach(function (input) {

          describe(JSON.stringify(input), function () {

            it('should be ' + output, function () {
              const query = formatValues({names: input});
              const value = typeof input === 'string' ? '"' + input + '"' : input;
              expect(query).to.deep.equal('SET `names` = ' + value);
            });
          });
        });
      });
    });
  });

  describe('object', function () {
    const inputs = [];
    const outputs = [];

    [0, 1.1, 1.1E1, 1.1E+1, 1.1E-1].forEach(function (value) {
      ['', '+', '-'].forEach(function (sign) {
        const output = parseFloat(sign + value);
        [output, sign + value].forEach(function (input) {
          inputs.push(input);
          outputs.push(input);
        });
      });
    });

    describe('array', function () {
      const assertIn = inputs;
      const assertOut = outputs;

      it('should be normalized', function () {
        const query = formatValues({names: assertIn});
        expect(query).to.deep.equal('SET `names` = "' + assertOut + '"');
      });
    });

    describe('object', function () {
      const assertIn = Object.assign({}, inputs);
      const assertOut = Object.assign({}, outputs);

      it('should be normalized', function () {
        const query = formatValues({names: assertIn});
        expect(query).to.deep.equal('SET `names` = "' + assertOut + '"');
      });
    });

    describe('nested array', function () {
      const assertIn = inputs.concat(inputs, Object.assign({}, inputs));
      const assertOut = outputs.concat(outputs, Object.assign({}, outputs));

      it('should be normalized', function () {
        const query = formatValues({names: assertIn});
        expect(query).to.deep.equal('SET `names` = "' + assertOut + '"');
      });
    });

    describe('nested object', function () {
      const assertIn = Object.assign({}, inputs.concat(inputs, Object.assign({}, inputs)));
      const assertOut = Object.assign({}, outputs.concat(outputs, Object.assign({}, outputs)));

      it('should be normalized', function () {
        const query = formatValues({names: assertIn});
        expect(query).to.deep.equal('SET `names` = "' + assertOut + '"');
      });
    });
  });

  describe('string', function () {

    ['', '+', '-'].forEach(function (sign) {

      it('should be "' + sign + '"', function () {
        const query = formatValues({names: sign});
        expect(query).to.deep.equal('SET `names` = "' + sign + '"');
      });
    });
  });

  describe('array', function () {

    it('should insert multiple entries', function () {
      const query = formatValues([
        {name1: 'value'},
        {name2: 12},
        {name3: true},
        {name4: {}},
        {
          name1: 'entry',
          name2: 'with',
          name3: 'all',
          name4: 'values',
        },
      ]);
      expect(query).to.deep.equal(
        '(`name1`, `name2`, `name3`, `name4`) VALUES ' +
        '("value", NULL, NULL, NULL), ' +
        '(NULL, 12, NULL, NULL), ' +
        '(NULL, NULL, TRUE, NULL), ' +
        '(NULL, NULL, NULL, "[object Object]"), ' +
        '("entry", "with", "all", "values")');
    });
  });
});