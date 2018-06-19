/*
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

const assert = require('assert');
const ebony = require('..');

describe('Bot', function () {
    const Bot = ebony.Bot;
    it('should be a function (constructor)', function () {
        assert.equal(typeof Bot, 'function');
    });
    it('should create an object', function () {
        const bot = new Bot({
            handlers: {},
            db: {},
            fb: {}
        });
        assert.equal(typeof bot, 'object');
    });
});
