/**
 * ebony-framework
 *
 * @module sendAPI/quickreplies
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */
import { SerializedQuickreply } from './interfaces';
/** The generic QuickReply class */
export declare class QuickReply {
    title: string;
    content_type: string;
    payload: string;
    /**
     * Creates a QuickReply
     * @param {string} content_type - The type of the QuickReply
     * @param {string} title - The title of the QuickReply
     * @param {?object|?string} payload - The payload sent when the QuickReply is pushed
     */
    constructor(content_type: string, title: string, payload?: string | {});
    serialize(): SerializedQuickreply;
}
/** Location Quick Reply
 * @extends QuickReply
 */
export declare class LocationQuickReply extends QuickReply {
    constructor();
}
/**
 * Text Quick Reply
 * @extends QuickReply
 */
export declare class TextQuickReply extends QuickReply {
    /**
     * Create a TextQuickReply
     * @param {string} title - The title of the QuickReply
     * @param {?string|?object} payload - They payload sent when the QuickReply is pushed
     */
    constructor(title: string, payload: any);
}
//# sourceMappingURL=quickreplies.d.ts.map