import {expect} from "chai";
import formatValues from "./values";
import {ValuesDto} from "./values.dto";

describe('VALUES', () => {

  describe('names', () => {

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
        assert: 'SET `` = "", ` ` = " "'
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
    ].forEach((config) => {

      describe(String(JSON.stringify(config.names)), () => {

        it('should be "' + config.assert[0] + '"', () => {
          const query = formatValues(config.names);
          expect(query).to.deep.equal(config.assert);
        });
      });
    });
  });

  describe('boolean', () => {

    [true, false].forEach((value) => {
      [value, value.toString(), value.toString().toUpperCase()].forEach((input) => {

        describe(typeof input + ' - ' + input, () => {

          it('should be ' + value, () => {
            const query = formatValues({names: input});
            const value = typeof input === 'string' ? '"' + input + '"' : input.toString().toUpperCase();
            expect(query).to.deep.equal('SET `names` = ' + value);
          });
        });
      });
    });
  });

  describe('numbers', () => {

    [0, 1.1, 1.1E1, 1.1E+1, 1.1E-1].forEach((value) => {
      ['', '+', '-'].forEach((sign) => {
        const output = parseFloat(sign + value);
        [output, sign + value].forEach((input) => {

          describe(JSON.stringify(input), () => {

            it('should be ' + output, () => {
              const query = formatValues({names: input});
              const value = typeof input === 'string' ? '"' + input + '"' : input;
              expect(query).to.deep.equal('SET `names` = ' + value);
            });
          });
        });
      });
    });
  });

  describe('object', () => {
    const inputs: Array<number | string> = [];

    [0, 1.1, 1.1E1, 1.1E+1, 1.1E-1].forEach((value) => {
      ['', '+', '-'].forEach((sign) => {
        const output = parseFloat(sign + value);
        [output, sign + value].forEach((input) => {
          inputs.push(input);
        });
      });
    });

    describe('array', () => {
      const assertIn = inputs;

      it('should be normalized', () => {
        const query = formatValues({names: assertIn} as unknown as ValuesDto);
        expect(query).to.deep.equal('SET `names` = NULL');
      });
    });

    describe('object', () => {
      const assertIn = Object.assign({}, inputs);

      it('should be normalized', () => {
        const query = formatValues({names: assertIn} as unknown as ValuesDto);
        expect(query).to.deep.equal('SET `names` = NULL');
      });
    });

    describe('nested array', () => {
      const assertIn = inputs.concat(inputs, Object.assign({}, inputs));

      it('should be normalized', () => {
        const query = formatValues({names: assertIn} as unknown as ValuesDto);
        expect(query).to.deep.equal('SET `names` = NULL');
      });
    });

    describe('nested object', () => {
      const assertIn = Object.assign({}, inputs.concat(inputs, Object.assign({}, inputs)));

      it('should be normalized', () => {
        const query = formatValues({names: assertIn} as unknown as ValuesDto);
        expect(query).to.deep.equal('SET `names` = NULL');
      });
    });
  });

  describe('string', () => {

    ['', '+', '-'].forEach((sign) => {

      it('should be "' + sign + '"', () => {
        const query = formatValues({names: sign});
        expect(query).to.deep.equal('SET `names` = "' + sign + '"');
      });
    });
  });

  describe('array', () => {

    it('should insert multiple entries', () => {
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
      ] as unknown as ValuesDto);
      expect(query).to.deep.equal(
        '(`name1`, `name2`, `name3`, `name4`) VALUES ' +
        '("value", NULL, NULL, NULL), ' +
        '(NULL, 12, NULL, NULL), ' +
        '(NULL, NULL, TRUE, NULL), ' +
        '(NULL, NULL, NULL, NULL), ' +
        '("entry", "with", "all", "values")');
    });
  });
});
