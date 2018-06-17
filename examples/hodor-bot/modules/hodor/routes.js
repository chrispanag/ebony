const bot = require('../../bot');

module.exports = {
    menu: {
        test: (id, user) => bot.actions.exec('hodor', id, user)
    },
    withoutData: {
        test: (id, user) => bot.actions.exec('hodor', id, user)
    },
    withData: {}
}