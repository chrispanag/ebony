/*
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
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
