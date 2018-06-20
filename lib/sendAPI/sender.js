/**
 * ebony-framework
 * 
 * @module sendAPI/sender 
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

'use strict';

/**
 * Creates a sender function
 * @param {object} fb - An instance of the FB API Class 
 * @returns {function} - Returns the sender function
 */
function senderFactory(fb) {

    /**
     * @typedef {object} MessagingOptions
     * @property {?string} tag - The messaging tag used to send the message
     * @property {?string} notification_type - The notification type of the message
     * @property {?type} type - The type of the message
     */

    /**
     * Sends a message to the user with the id
     * @param {!string} id - The id of the user
     * @param {!Message} message - The message to be sent
     * @param {?MessagingOptions} options - The sending options (OPTIONAL)
     * @returns {Promise} - Returns a promise
     */
    function send(id, message, options = {}) {
        const { tag = null, notification_type = "REGULAR", type = "RESPONSE" } = options;

        if (!id)
            throw new Error("[Error] Send: No user id is specified!");
        if (!message)
            throw new Error("[Error] No message passed!");

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
