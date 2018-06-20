/*
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

const assert = require('assert');

const { PostbackButton, UrlButton, ShareButton, CallButton } = require('../..').sendAPI.elements;

describe('PostbackButton', function () {
    it('Should be a function (constructor)', function () {
        assert.strictEqual(typeof PostbackButton, 'function');
    });

    const button = new PostbackButton("test", "test");
    it('Should construct an object', function () {
        assert.strictEqual(typeof button, 'object');
    });
    describe('serialize()', function () {
        it('Should be a function', function () {
            assert.strictEqual(typeof button.serialize, 'function');
        });

        it('Should return an object', function () {
            assert.strictEqual(typeof button.serialize(), 'object');
        });

        it('The type should be "postback"', function () {
            assert.strictEqual(button.serialize().type, "postback");
        });

        it('The title should be a string and equal to "test"', function () {
            assert.strictEqual(typeof button.serialize().title, 'string');
            assert.strictEqual(button.serialize().title, "test");
        });

        it('The serialized payload should always be a string', function () {
            const textPayloadButton = new PostbackButton("test", "test");
            assert.strictEqual(typeof textPayloadButton.serialize().payload, 'string');
            assert.strictEqual(textPayloadButton.serialize().payload, "test");

            const objectPayload = { type: "test", postback: "test2" };
            const objectPayloadButton = new PostbackButton("test", objectPayload);

            assert.strictEqual(typeof objectPayloadButton.serialize().payload, 'string');
            assert.strictEqual(objectPayloadButton.serialize().payload, JSON.stringify(objectPayload));
        });
    });
});

describe('UrlButton', function () {
    it('Should be a function (constructor)', function () {
        assert.strictEqual(typeof UrlButton, 'function');
    })

    const button = new UrlButton("test", "https://test.com");
    it('Should construct an object', function () {
        assert.strictEqual(typeof button, 'object');
    });
    describe('serialize()', function () {
        it('Should be a function', function () {
            assert.strictEqual(typeof button.serialize, 'function');
        });
        it('Should return an object', function () {
            assert.strictEqual(typeof button.serialize(), 'object');
        });
        it('The type should be "web_url"', function () {
            assert.strictEqual(button.serialize().type, "web_url");
        });
        it('The payload should be a string and equal to "https://test.com"', function () {
            assert.strictEqual(typeof button.serialize().url, 'string');
            assert.strictEqual(button.serialize().url, "https://test.com");
        });
        it('The title should be a string and equal to "test"', function () {
            assert.strictEqual(typeof button.serialize().title, 'string');
            assert.strictEqual(button.serialize().title, "test");
        });
    });
});

describe('ShareButton', function () {
    it('Should be a function (constructor)', function () {
        assert.strictEqual(typeof ShareButton, 'function');
    });

    const button = new ShareButton();
    it('Should construct an object', function () {
        assert.strictEqual(typeof button, 'object');
    });

    describe('serialize()', function () {
        it('Should be a function', function () {
            assert.strictEqual(typeof button.serialize, 'function');
        });
        it('Should return an object', function () {
            assert.strictEqual(typeof button.serialize(), 'object');
        });
        it('The type should be "element_share"', function () {
            assert.strictEqual(button.serialize().type, "element_share");
        });
    });
});

describe('CallButton', function () {
    it('Should be a function (constructor)', function () {
        assert.strictEqual(typeof CallButton, 'function');
    });

    const button = new CallButton("Test", "1325728291");
    it('Should construct an object', function () {
        assert.strictEqual(typeof button, 'object');
    });

    describe('serialize()', function () {
        it('Should be a function', function () {
            assert.strictEqual(typeof button.serialize, 'function');
        });
        it('Should return an object', function () {
            assert.strictEqual(typeof button.serialize(), 'object');
        });
        it('The type should be "phone_number"', function () {
            assert.strictEqual(button.serialize().type, "phone_number");
        });
        it('The payload should be a string and equal to "test"', function () {
            assert.strictEqual(typeof button.serialize().payload, 'string');
            assert.strictEqual(button.serialize().payload, "1325728291");
        });
        it('The title should be a string and equal to "1325728291"', function () {
            assert.strictEqual(typeof button.serialize().title, 'string');
            assert.strictEqual(button.serialize().title, "Test");
        });
    });
});
