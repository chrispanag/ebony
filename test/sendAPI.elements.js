/*
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

const assert = require('assert');

const { elements } = require('..').sendAPI;

describe('elements', function () {
    it('should be an object', function () {
        assert.equal(typeof elements, 'object');
    });
});
