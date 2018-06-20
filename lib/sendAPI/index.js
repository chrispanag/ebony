/**
 * ebony-framework
 * 
 * @module sendAPI/index 
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */

'use strict';

const attachments = require('./attachments');
const buttons = require('./buttons');
const quickreplies = require('./quickreplies');
const templates = require('./templates');

const sender = require('./sender');
const Message = require('./message');

module.exports = {
    Message,
    sender,
    elements: {
        ...buttons,
        ...attachments,
        ...quickreplies,
        ...templates
    }
}
