/*
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

const assert = require('assert');

const { GenericTemplate, ListTemplate, MediaTemplate } = require('../..').sendAPI.elements;

describe('GenericTemplate', function () {
    it('should be an object', function () {
        const genericTemplate = new GenericTemplate({});
        assert.strictEqual(typeof genericTemplate, 'object');
    });

    it('should accept at most 11 elements');
    it('should have at least one element');
});

describe('ListTemplate', function () {
    it('should be an object', function () {
        const listTemplate = new ListTemplate({});
        assert.strictEqual(typeof listTemplate, 'object');
    });

    it('should accept at most 4 elements');
});

describe('MediaTemplate', function () {
    it('should be an object', function () {
        const listTemplate = new MediaTemplate("test");
        assert.strictEqual(typeof listTemplate, 'object');
    });
});
