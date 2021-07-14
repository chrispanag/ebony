/**
 * ebony-framework
 *
 * @module handlers/attachment
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2020 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import User from '../models/User';
import { GenericAttachment } from '../interfaces/attachment';

type yes_noAnswerF = (...params: any) => Promise<any>;

export default function attachmentHandler<U extends User<any>>(messages: any = {}) {
    const { story_mention } = messages;
    return (user: U, attachment: GenericAttachment) => {
        if (attachment.type === 'story_mention') return story_mention(user);
    };
}
