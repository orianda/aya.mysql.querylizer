'use strict';

const expect = require('chai').expect;
const index = require('../src');

describe('index', function () {
    const names = Object.keys(index);

    it('should have 8 modules', function () {
        expect(names.length).to.equal(9);
    });

    it('should have modules', function () {
        names.forEach(function (name) {
            index[name] = require('../src/' + name);
        });
    });
});
