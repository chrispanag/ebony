/*
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

const assert = require('assert');

const { ImageAttachment, TemplateAttachment } = require('../..').sendAPI.elements;

describe('ImageAttachment', function () {
    const imageAtts = new ImageAttachment("https://facebook.com");
    it('should be an object', function () {
        assert.strictEqual(typeof imageAtts, 'object');
    });

    it('its type should be "image" and the payload an object', function () {
        assert.strictEqual(imageAtts.type, "image");
        assert.strictEqual(typeof imageAtts.payload, 'object');
    });
});

describe('TemplateAttachment', function () {
    const templateAtts = new TemplateAttachment({});
    it('should be an object', function () {
        assert.strictEqual(typeof templateAtts, 'object');
    });

    it('its type should be "template" and the payload an object', function () {
        assert.strictEqual(templateAtts.type, "template");
        assert.strictEqual(typeof templateAtts.payload, 'object');
    });

});

