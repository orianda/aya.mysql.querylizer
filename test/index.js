'use strict';

var expect = require('chai').expect,
    index = require('../src');

describe('index', function () {
    var names = Object.keys(index);
    it('should have 5 modules', function () {
        expect(names.length).to.equal(5);
    });
    it('should have modules', function () {
        names.forEach(function (name) {
            index[name] = require('../src/' + name);
        });
    });
});
