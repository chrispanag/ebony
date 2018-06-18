/*!
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

'use strict';

function senderFactory(fb) {

    function send(id, message, options = {}) {
        const { tag = null, notification_type = "REGULAR", type = "RESPONSE" } = options;

        if (!id)
            throw new Error("[Error] Send: No user id is specified!");

        let messaging_type = type;
        if (tag)
            messaging_type = "MESSAGE_TAG";

        const body = {
            recipient: { id },
            message: message.serialize(),
            notification_type,
            messaging_type
        };

        // TODO implement logger in here.
        return fb.sendAPI(body);
    }

    return send;
}

module.exports = senderFactory;
