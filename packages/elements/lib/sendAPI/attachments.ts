/**
 * ebony-framework
 *
 * @module sendAPI/attachments
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2020 Christos Panagiotakopoulos
 * @license MIT
 *
 */

/** Generic attachment class */
export class Attachment {
    public type: string;
    public payload: Record<string, unknown>;

    /**
     * Create a generic attachment
     * @param {string} type - The type of the attachment
     * @param {object} payload - The attachment
     */
    constructor(type: string, payload: Record<string, unknown>) {
        this.type = type;
        this.payload = payload;
    }

    public serialize() {
        return {
            type: this.type,
            payload: this.payload
        };
    }
}

/** An image attachment */
export class ImageAttachment extends Attachment {
    /**
     * Create an Image Attachment
     * @param {string} url - The url of the image
     */
    constructor(url: string) {
        super('image', {
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
    constructor(template: Record<string, unknown>) {
        super('template', template);
    }
}
