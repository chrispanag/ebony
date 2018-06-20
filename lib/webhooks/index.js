/**
 * ebony-framework
 * 
 * @module webhooks/index
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
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
