const { Message, elements } = require('../../../newFramework').sendAPI;
const { ButtonTemplate, PostbackButton } = elements;
const bot = require('../../bot');

function hodor(id, user) {
    const message = new Message({
        attachment: new ButtonTemplate("Test", [
            new PostbackButton("Test", "test")
        ])
    });
    return bot.send(id, message);
}

module.exports = {
    hodor
}