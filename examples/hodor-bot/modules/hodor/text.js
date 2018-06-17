const bot = require('../../bot');

module.exports = [
    { regex: /HODOR/, action: (id, user) => bot.actions.exec('hodor', id, user) },
];
