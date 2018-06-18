/*
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

const commentWebhook = require('./comment');
const messagingWebhook = require('./messaging');
const threadControlWebhook = require('./threadControl');
const standbyWebhook = require('./standby');

module.exports = {
    messagingWebhook,
    commentWebhook,
    threadControlWebhook,
    standbyWebhook
};
