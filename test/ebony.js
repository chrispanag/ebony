const assert = require('assert');

const ebony = require('..');

describe('ebony', function () {
    it('should be an object', function () {
        assert.equal(typeof ebony, 'object');
    });
    it('should contain the keys: Bot, utilities, models, sendAPI, webhookFactories', function () {
        assert.equal('Bot' in ebony, true);
        assert.equal('utilities' in ebony, true);
        assert.equal('models' in ebony, true);
        assert.equal('sendAPI' in ebony, true);
        assert.equal('webhookFactories' in ebony, true);
    });
});
