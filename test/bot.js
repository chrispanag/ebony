const assert = require('assert');
const ebony = require('..');

const Bot = ebony.Bot;

describe('Bot', function () {
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
