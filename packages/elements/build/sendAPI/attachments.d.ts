/**
 * ebony-framework
 *
 * @module sendAPI/attachments
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */
/** Generic attachment class */
export declare class Attachment {
    type: string;
    payload: {};
    /**
     * Create a generic attachment
     * @param {string} type - The type of the attachment
     * @param {object} payload - The attachment
     */
    constructor(type: string, payload: {});
    serialize(): {
        type: string;
        payload: {};
    };
}
/** An image attachment */
export declare class ImageAttachment extends Attachment {
    /**
     * Create an Image Attachment
     * @param {string} url - The url of the image
     */
    constructor(url: string);
}
/** A template attachment */
export declare class TemplateAttachment extends Attachment {
    /**
     * A template attachment (List, Button or Generic)
     * @param {object} template - The template included within this attachment
     */
    constructor(template: {});
}
//# sourceMappingURL=attachments.d.ts.map