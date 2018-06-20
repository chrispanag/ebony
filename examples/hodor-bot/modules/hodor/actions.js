const { Message } = require('../../../..').sendAPI;

const bot = require('../../bot');

function hodor(id, user) {
    const message = new Message({
        text: "Hodor?"
    });
    return bot.send(id, message);
}

module.exports = {
    hodor
}
