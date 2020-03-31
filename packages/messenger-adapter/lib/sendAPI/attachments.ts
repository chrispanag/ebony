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
export class Attachment {

    public type: string;
    public payload: {};

    /**
     * Create a generic attachment
     * @param {string} type - The type of the attachment
     * @param {object} payload - The attachment
     */
    constructor(type: string, payload: {}) {
        this.type = type;
        this.payload = payload;
    }

    serialize() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

/** An image attachment */
export class ImageAttachment extends Attachment {

    /**
     * Create an Image Attachment
     * @param {string} url - The url of the image
     */
    constructor(url: string) {
        super("image", {
            url
        });
    }
}

/** A template attachment */
export class TemplateAttachment extends Attachment {

    /**
     * A template attachment (List, Button or Generic)
     * @param {object} template - The template included within this attachment
     */
    constructor(template: {}) {
        super("template", template);
    }
}