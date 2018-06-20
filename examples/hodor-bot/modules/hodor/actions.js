const { Message, elements } = require('../../../..').sendAPI;
const { ButtonTemplate, PostbackButton } = elements;
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
