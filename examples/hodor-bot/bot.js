/*
    A module that initializes and caches the bot object for reuse throughout the project
    It also initializes the FB API object.
*/

const ebony = require('../..');
const { FB } = require('fblib');
const db = require('./db').db();

const { Bot } = ebony;

const FB_PAGE_TOKEN = 'EAADnrXCiqc4BAOJYDQov8ix9jwDo6T6QZAUvmHW6H7cgZBQakH5oGY73mfM8fexITcxU6ZB0voWyNJoJMKNfZBqoQOtFTZCdfYRQHtDtZAm6jQfEdXi5ZCn2AJ5RrR2Yynvzzao6AasFNdlPWYWBFyhD0S7cVlVUgx8x0ZBSzLa2OwZDZD';
const FB_APP_SECRET = '9fe8c5649961947d06ac9c8d71297d2f';

const fb = new FB(FB_PAGE_TOKEN, FB_APP_SECRET);

const bot = new Bot({
    handlers: {},
    db,
    fb
});

module.exports = bot;
