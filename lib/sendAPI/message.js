/**
 * ebony-framework
 * 
 * @module sendAPI/message
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

'use strict';

/** Message Class */
class Message {

    /**
     * @typedef {οbject} MessageOptions
     * @property {?string} text
     * @property {Quickreply[]} quickreplies
     * @property {?Attachment} attachment
     * @property {?string} templateID
     */

    /**
     * Create a message
     * @param {MessageOptions|string} options - The message elements
    */
    constructor(options = {}) {
        let { text = null, quickreplies = null, attachment = null, templateID = null } = options;

        if (!(typeof options === "object"))
            text = options, quickreplies = null, attachment = null, templateID = null;

        if (!(text || attachment))
            throw new Error("Message: No message content is specified!");
        if (text && attachment)
            throw new Error("Message: A message can't have text & attachment");

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
