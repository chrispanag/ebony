const { Message } = require('../../../..').sendAPI;

const bot = require('../../bot');

function hodor(id, user) {
    const message = new Message({
        text: "Hodor?"
    });
    const message2 = new Message({
        text: "Hodor Tester?"
    });
    console.log("test");
    return bot.scenario(id)
        .types()
        .wait(1000)
        .send(message)
        .wait(2000)
        .types()
        .wait(1000)
        .send(message2)
        .end();
}

module.exports = {
    hodor
}
