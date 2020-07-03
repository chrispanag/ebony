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

function defaultYesNo() {
    return Promise.resolve();
}

type yes_noAnswerF = (...params: any) => Promise<any>;

function attachmentHandler<U extends User>(
    yes_noAnswer: yes_noAnswerF = defaultYesNo,
    messages: any = {}
) {
    const { attachmentDefault } = messages;

    return (user: U, attachment: GenericAttachment) => {
        return attachmentDefault(user);
    };
}

export default attachmentHandler;
