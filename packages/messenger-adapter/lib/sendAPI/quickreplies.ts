/**
 * ebony-framework
 * 
 * @module sendAPI/quickreplies 
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

import { isObjectPayload, SerializedQuickreply } from './interfaces';

/** The generic QuickReply class */
export class QuickReply {

    public title: string;
    public content_type: string;
    public payload: string;

    /**
     * Creates a QuickReply
     * @param {string} content_type - The type of the QuickReply
     * @param {string} title - The title of the QuickReply
     * @param {?object|?string} payload - The payload sent when the QuickReply is pushed
     */
    constructor(content_type: string, title: string, payload: string | {} = "") {
        let serializedPayload = JSON.stringify(payload);
        if (!isObjectPayload(payload))
            serializedPayload = payload;

        this.title = title;
        this.payload = serializedPayload;
        this.content_type = content_type;
    }

    serialize(): SerializedQuickreply {
        return {
            content_type: this.content_type,
            title: this.title,
            payload: this.payload
        };
    }
}

/** Location Quick Reply 
 * @extends QuickReply
*/
export class LocationQuickReply extends QuickReply {
    constructor() {
        super("location", "", "");
    }
}

/**
 * Text Quick Reply 
 * @extends QuickReply
 */
export class TextQuickReply extends QuickReply {
    
    /**
     * Create a TextQuickReply
     * @param {string} title - The title of the QuickReply 
     * @param {?string|?object} payload - They payload sent when the QuickReply is pushed
     */
    constructor(title: string, payload: any) {
        super("text", title, payload);
    }
}