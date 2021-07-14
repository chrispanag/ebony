/**
 * ebony-framework
 *
 * @module handlers/attachment
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2020 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import AttachmentRouter from '../routers/AttachmentRouter';

import User from '../models/User';
import { GenericAttachment } from '../interfaces/attachment';

export default function attachmentHandler<U extends User<any>>(
    typeMatcher: AttachmentRouter = new AttachmentRouter()
) {
    return (user: U, attachment: GenericAttachment) => {
        const action = typeMatcher.getRoute(attachment.type);
        if (action) {
            return action(user);
        }
        console.log('No Attachment Handler for Attachment of type: ' + attachment.type);
    };
}
