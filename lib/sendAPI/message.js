/*
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

'use strict';

class Message {

    constructor(options = {}) {
        let { text = null, quickreplies = null, attachment = null, templateID = null } = options;

        if (!(typeof options === "object"))
            text = options, quickreplies = null, attachment = null, templateID = null;

        if (!(text || attachment))
            throw new Error("fbMessage: No message content is specified!");

        this.text = text;

        this.quickreplies = quickreplies
        if (quickreplies)
            this.quickreplies = quickreplies.map(q => q.serialize());

        this.attachment = attachment;
        if (attachment)
            this.attachment = attachment.serialize();

        this.templateID = templateID;
    }

    serialize() {
        if (this.attachment) {
            return {
                attachment: this.attachment
            };
        }

        return {
            text: this.text,
            quick_replies: this.quickreplies
        };
    }

}

module.exports = Message;
