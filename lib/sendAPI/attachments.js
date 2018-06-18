/*!
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

'use strict';

class Attachment {
    constructor (type, payload) {
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

class ImageAttachment extends Attachment {
    constructor (url) {
        super("image", {
            url
        });
    }
}

class TemplateAttachment extends Attachment {
    constructor(template) {
        super("template", template);
    }
}

module.exports = {
    TemplateAttachment,
    ImageAttachment
}

