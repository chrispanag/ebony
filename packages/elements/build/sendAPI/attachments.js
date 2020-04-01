"use strict";
/**
 * ebony-framework
 *
 * @module sendAPI/attachments
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** Generic attachment class */
class Attachment {
    /**
     * Create a generic attachment
     * @param {string} type - The type of the attachment
     * @param {object} payload - The attachment
     */
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
    serialize() {
        return {
            type: this.type,
            payload: this.payload
        };
    }
}
exports.Attachment = Attachment;
/** An image attachment */
class ImageAttachment extends Attachment {
    /**
     * Create an Image Attachment
     * @param {string} url - The url of the image
     */
    constructor(url) {
        super('image', {
            url
        });
    }
}
exports.ImageAttachment = ImageAttachment;
/** A template attachment */
class TemplateAttachment extends Attachment {
    /**
     * A template attachment (List, Button or Generic)
     * @param {object} template - The template included within this attachment
     */
    constructor(template) {
        super('template', template);
    }
}
exports.TemplateAttachment = TemplateAttachment;
//# sourceMappingURL=attachments.js.map