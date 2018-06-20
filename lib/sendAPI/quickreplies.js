/**
 * ebony-framework
 * 
 * @module sendAPI/quickreplies 
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

'use strict';

class QuickReply {
    constructor (content_type, title, payload = "") {
        this.title = title;
        this.payload = payload;
        this.content_type = content_type;
    }

    serialize() {
        return {
            content_type: this.content_type,
            title: this.title,
            payload: JSON.stringify(this.payload)
        };
    }
}

class LocationQuickReply extends QuickReply {
    constructor (title, payload) {
        super("location", title, payload);
    }
}

class TextQuickReply extends QuickReply {
    constructor (title, payload) {
        super("text", title, payload);
    }
}

module.exports = {
    LocationQuickReply,
    TextQuickReply
}
