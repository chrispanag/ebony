/**
 * ebony-framework
 *
 * @module handlers/attachment
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import User from '../models/User';
import { GenericAttachment } from '../interfaces/attachment';

const { stickers } = require('messenger-platform-node');

function defaultYesNo() {
    return Promise.resolve();
}

type yes_noAnswerF = (...params: any) => Promise<any>;

function attachmentHandler<U extends User>(
    yes_noAnswer: yes_noAnswerF = defaultYesNo,
    messages: any = {}
) {
    const { defaultThumbsUp, attachmentDefault } = messages;

    return (user: U, attachment: GenericAttachment) => {
        if (attachment.payload) {
            if (isSticker(attachment)) {
                if (user.context.expecting === 'yes_no') {
                    return yes_noAnswer(user, 'positive');
                }

                return defaultThumbsUp(user);
            }
        }

        return attachmentDefault(user);
    };
}

function isSticker(attachment: GenericAttachment): boolean {
    if (attachment.payload) {
        return (
            attachment.payload.sticker_id === stickers.thumbsUpSmall ||
            attachment.payload.sticker_id === stickers.thumbsUpMedium ||
            attachment.payload.sticker_id === stickers.thumbsUpLarge
        );
    }

    return false;
}

export default attachmentHandler;
