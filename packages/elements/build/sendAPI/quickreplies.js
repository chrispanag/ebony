"use strict";
/**
 * ebony-framework
 *
 * @module sendAPI/quickreplies
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("./interfaces");
/** The generic QuickReply class */
class QuickReply {
    /**
     * Creates a QuickReply
     * @param {string} content_type - The type of the QuickReply
     * @param {string} title - The title of the QuickReply
     * @param {?object|?string} payload - The payload sent when the QuickReply is pushed
     */
    constructor(content_type, title, payload = '') {
        let serializedPayload = JSON.stringify(payload);
        if (!interfaces_1.isObjectPayload(payload)) {
            serializedPayload = payload;
        }
        this.title = title;
        this.payload = serializedPayload;
        this.content_type = content_type;
    }
    serialize() {
        return {
            content_type: this.content_type,
            title: this.title,
            payload: this.payload
        };
    }
}
exports.QuickReply = QuickReply;
/** Location Quick Reply
 * @extends QuickReply
 */
class LocationQuickReply extends QuickReply {
    constructor() {
        super('location', '', '');
    }
}
exports.LocationQuickReply = LocationQuickReply;
/**
 * Text Quick Reply
 * @extends QuickReply
 */
class TextQuickReply extends QuickReply {
    /**
     * Create a TextQuickReply
     * @param {string} title - The title of the QuickReply
     * @param {?string|?object} payload - They payload sent when the QuickReply is pushed
     */
    constructor(title, payload) {
        super('text', title, payload);
    }
}
exports.TextQuickReply = TextQuickReply;
//# sourceMappingURL=quickreplies.js.map