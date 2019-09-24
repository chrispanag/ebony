/**
 * ebony-framework
 *
 * @module handlers/attachment
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import User from "../models/User";
import { GenericAttachment } from "../interfaces/attachment";

const { stickers } = require('messenger-platform-node');

function defaultYesNo() {
    return Promise.resolve();
}

/**
 * @param {function} locationHandler - A Location Handler function
 * @param {function} yes_noAnswer - A function that handles yes/no answers
 * @param {object} messages - The actions object
 * @param {object} fb - The fb object
 * @returns {function} - Returns an attachmentHandler
 */

type locationHandlerF = (...params: any) => Promise<any>;
type yes_noAnswerF = (...params: any) => Promise<any>;

function attachmentHandler<U extends User>(locationHandler: locationHandlerF, yes_noAnswer: yes_noAnswerF = defaultYesNo, messages: any = {}) {
    const { defaultThumbsUp, attachmentDefault } = messages;

    return (user: U, attachment: GenericAttachment) => {

        if (attachment.payload) {
            if (isSticker(attachment)) {
                if (user.context.expecting === "yes_no") {
                    return yes_noAnswer(user, "positive");
                }

                return defaultThumbsUp(user);
            }
            // Location
            if (attachment.payload.coordinates) {
                return locationHandler(user, attachment.payload.coordinates);
            }
        }

        return attachmentDefault(user);
    };
}

function isSticker(attachment: GenericAttachment): boolean {
    if (attachment.payload) {
        return (attachment.payload.sticker_id === stickers.thumbsUpSmall) ||
            (attachment.payload.sticker_id === stickers.thumbsUpMedium) ||
            (attachment.payload.sticker_id === stickers.thumbsUpLarge);
    }

    return false;
}

export default attachmentHandler;