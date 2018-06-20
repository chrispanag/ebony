/*
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

const assert = require('assert');

const { Message } = require('../..').sendAPI;
const { ImageAttachment } = require('../..').sendAPI.elements;

describe("Message", function () {

    it("should be an object", function () {
        const message = new Message({
            text: "test"
        });
        assert.strictEqual(typeof message, 'object');
    });
    
    it("should throw an error if neither text nor attachment exists", function () {
        assert.throws(() => new Message(), "fbMessage: No message content is specified!");
    });

    describe('serialize()', function () {

        it("should return an object", function () {
            const textMessage = new Message({
                text: "text"
            });
            assert.strictEqual(typeof textMessage.serialize(), 'object');
        });

        it("should have an attachment property only if it has the attachment set", function () {
            const textMessage = new Message({
                text: "text"
            });
            assert.strictEqual(typeof textMessage.serialize().attachment, 'undefined');
            const attachmentMessage = new Message({
                attachment: new ImageAttachment("https://test.com")
            });
            assert.strictEqual(typeof attachmentMessage.serialize().attachment, 'object');
        })
    })
});
