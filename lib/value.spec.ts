import {expect} from "chai";
import formatValue from "./value";
import {ValueDto} from "./value.dto";

describe('VALUE', () => {

  describe('string', () => {

    it('should format some string', () => {
      const query = formatValue('string');
      expect(query).to.equal('"string"');
    });

    it('should format quoted string', () => {
      const query = formatValue('some quoted "string"');
      expect(query).to.equal('"some quoted \\"string\\""');
    });

    it('should format empty string', () => {
      const query = formatValue('');
      expect(query).to.equal('""');
    });
  });

  describe('number', () => {

    it('should format positive integer', () => {
      const query = formatValue(12);
      expect(query).to.equal('12');
    });

    it('should format negative integer', () => {
      const query = formatValue(-12);
      expect(query).to.equal('-12');
    });

    it('should format big positive integer', () => {
      const query = formatValue(12E+12);
      expect(query).to.equal('12000000000000');
    });

    it('should format big negative integer', () => {
      const query = formatValue(-12E+12);
      expect(query).to.equal('-12000000000000');
    });

    it('should format positive float', () => {
      const query = formatValue(12.12);
      expect(query).to.equal('12.12');
    });

    it('should format negative float', () => {
      const query = formatValue(-12.12);
      expect(query).to.equal('-12.12');
    });

    it('should format big positive float', () => {
      const query = formatValue(12.12E-12);
      expect(query).to.equal('1.212e-11');
    });

    it('should format big negative float', () => {
      const query = formatValue(-12.12E-12);
      expect(query).to.equal('-1.212e-11');
    });

    it('should format NaN', () => {
      const query = formatValue(NaN);
      expect(query).to.equal('NULL');
    });

    it('should format positive infinity', () => {
      const query = formatValue(Infinity);
      expect(query).to.equal('NULL');
    });

    it('should format negative infinity', () => {
      const query = formatValue(-Infinity);
      expect(query).to.equal('NULL');
    });
  });

  describe('boolean', () => {

    it('should format true', () => {
      const query = formatValue(true);
      expect(query).to.equal('TRUE');
    });

    it('should format false', () => {
      const query = formatValue(false);
      expect(query).to.equal('FALSE');
    });
  });

  describe('Date', () => {

    it('should format valid date', () => {
      const query = formatValue(new Date(1502579091963));
      expect(query).to.equal('"2017-08-12T23:04:51.963Z"');
    });

    it('should format invalid date', () => {
      const query = formatValue(new Date('invalid'));
      expect(query).to.equal('NULL');
    });
  });

  describe('Array', () => {

    it('should insert list', () => {
      const query = formatValue([0, 1, -2, '3', 'four'] as unknown as ValueDto);
      expect(query).to.equal('NULL');
    });

    it('should insert empty list', () => {
      const query = formatValue([] as unknown as ValueDto);
      expect(query).to.equal('NULL');
    });
  });

  describe('Object', () => {

    it('should insert native object', () => {
      const query = formatValue({} as unknown as ValueDto);
      expect(query).to.equal('NULL');
    });

    it('should insert custom object', () => {
      const query = formatValue({
        toString: () => 'custom stringified object'
      } as unknown as ValueDto);
      expect(query).to.equal('NULL');
    });

    it('should format null', () => {
      const query = formatValue(null as unknown as ValueDto);
      expect(query).to.equal('NULL');
    });
  });

  describe('undefined', () => {

    it('should format undefined', () => {
      const query = formatValue(undefined);
      expect(query).to.equal('NULL');
    });
  });

  describe('function', () => {
    const query = formatValue((() => null) as unknown as ValueDto);
    expect(query).to.equal('NULL');
  });
});
