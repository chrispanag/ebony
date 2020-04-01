/**
 * ebony-framework
 *
 * @module sendAPI/message
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */
import { ISerializable } from '@ebenos/framework';
import { MessageOptions, SerializedMessage } from './interfaces';
import { QuickReply } from './quickreplies';
import { Attachment } from './attachments';
/** Message Class */
export declare class Message implements ISerializable {
    text: string | null;
    quickreplies: QuickReply[] | null;
    attachment: Attachment | null;
    templateID: string | null;
    /**
     * Create a message
     * @param {MessageOptions|string} options - The message elements
     */
    constructor(options?: MessageOptions);
    serialize(): SerializedMessage;
}
//# sourceMappingURL=message.d.ts.map