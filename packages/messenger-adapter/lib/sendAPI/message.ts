/**
 * ebony-framework
 * 
 * @module sendAPI/message
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

import { MessageOptions, SerializedMessage } from "./interfaces";
import { QuickReply } from "./quickreplies";
import { Attachment } from "./attachments";

/** Message Class */
export class Message {

    public text: string | null;
    public quickreplies: QuickReply[] | null;
    public attachment: Attachment | null;
    public templateID: string | null;

    /**
     * Create a message
     * @param {MessageOptions|string} options - The message elements
    */
    constructor(options: MessageOptions = {}) {
        let { text = null, quickreplies = null, attachment = null, templateID = null } = options;

        if (!(typeof options === "object"))
            text = options, quickreplies = null, attachment = null, templateID = null;

        if (!(text || attachment))
            throw new Error("Message: No message content is specified!");
        if (text && attachment)
            throw new Error("Message: A message can't have text & attachment");

        this.text = text;
        this.quickreplies = quickreplies
        this.attachment = attachment;
        this.templateID = templateID;
    }

    serialize(): SerializedMessage {
        const obj: any = {};

        if (this.text && this.attachment) {
            throw new Error("Message can't have both text and attachment!")
        }

        if (this.attachment) {
            obj.attachment = this.attachment.serialize();
        }

        if (this.text) {
            obj.text = this.text;
        }
        
        if (this.quickreplies) {
            obj.quick_replies = this.quickreplies.map(q => q.serialize());
        }

        return obj;
    }
}