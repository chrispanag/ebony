/*
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

const assert = require('assert');

const { TextQuickReply, LocationQuickReply } = require('../..').sendAPI.elements;

describe("TextQuickReply", function () {
    it('Should be a function (constructor)', function () {
        assert.strictEqual(typeof TextQuickReply, 'function');
    });

    const quickreply = new TextQuickReply("test", "test");
    it('Should construct an object', function () {
        assert.strictEqual(typeof quickreply, 'object');
    });
    describe('serialize()', function () {
        it('Should be a function', function () {
            assert.strictEqual(typeof quickreply.serialize, 'function');
        });

        it('Should return an object', function () {
            assert.strictEqual(typeof quickreply.serialize(), 'object');
        });

        it('The content_type should be "text"', function () {
            assert.strictEqual(quickreply.serialize().content_type, "text");
        });

        it('The title should be a string and equal to "test"', function () {
            assert.strictEqual(typeof quickreply.serialize().title, 'string');
            assert.strictEqual(quickreply.serialize().title, "test");
        });

        it('The serialized payload should always be a string', function () {
            const textPayloadQuickreply = new TextQuickReply("test", "test");
            assert.strictEqual(typeof textPayloadQuickreply.serialize().payload, 'string');
            assert.strictEqual(textPayloadQuickreply.serialize().payload, "test");

            const objectPayload = { type: "test", postback: "test2" };
            const objectPayloadQuickreply = new TextQuickReply("test", objectPayload);

            assert.strictEqual(typeof objectPayloadQuickreply.serialize().payload, 'string');
            assert.strictEqual(objectPayloadQuickreply.serialize().payload, JSON.stringify(objectPayload));
        });
    });
});

describe("LocationQuickReply", function () {
    it('Should be a function (constructor)', function () {
        assert.strictEqual(typeof LocationQuickReply, 'function');
    });

    const quickreply = new LocationQuickReply();
    it('Should construct an object', function () {
        assert.strictEqual(typeof quickreply, 'object');
    });
    describe('serialize()', function () {
        it('Should be a function', function () {
            assert.strictEqual(typeof quickreply.serialize, 'function');
        });

        it('Should return an object', function () {
            assert.strictEqual(typeof quickreply.serialize(), 'object');
        });

        it('The content_type should be "location"', function () {
            assert.strictEqual(quickreply.serialize().content_type, "location");
        });
    });
});
