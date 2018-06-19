const assert = require('assert');

const { sendAPI } = require('..');

describe('sendAPI', function () {
    it('should be an object', function () {
        assert.equal(typeof sendAPI, 'object');
    });
    it('should contain the keys: Message and elements', function () {
        assert.equal('Message' in sendAPI, true);
        assert.equal('elements' in sendAPI, true);
    });
});
