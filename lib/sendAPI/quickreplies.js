/*
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
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
