/*
    A module that initializes and caches the bot object for reuse throughout the project
    It also initializes the FB API object.
*/

const ebony = require('../..');
const { FB } = require('messenger-platform-node');

const { Bot } = ebony;

const FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN;
const FB_APP_SECRET = process.env.FB_APP_SECRET;

const db = ebony.utilities.database.db();

const fb = new FB(FB_PAGE_TOKEN, FB_APP_SECRET);

const bot = new Bot({
    handlers: {},
    db,
    fb
});

module.exports = bot;
