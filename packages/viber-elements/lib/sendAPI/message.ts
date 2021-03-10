/**
 * ebony-framework
 *
 * @module sendAPI/message
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2020 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import { ISerializable } from '@ebenos/framework';
import { MessageOptions, SerializedMessage } from './interfaces';
import { Picture } from './attachments';

/** Sender Class */
export class Sender {
    name: string;
    avatar: string;

    constructor() {
        this.name = '';
        this.avatar = '';
    }
}

/** Message Class */
export class Message implements ISerializable {
    public sender: Sender | null;
    public tracking_data: string | null;
    public type: string | null;
    public text: string | null;
    public attachment: Picture | null;

    /**
     * Create a message
     * @param {MessageOptions|string} options - The message elements
     */
    constructor(options: MessageOptions = {}) {
        let {
            text = null,
            sender = null,
            tracking_data = null,
            type = null,
            attachment = null
        } = options;

        if (!(typeof options === 'object')) {
            (text = options),
                (sender = null),
                (tracking_data = null),
                (type = null),
                (attachment = null);
        }

        if (!text) {
            throw new Error('Message: No message text is specified!');
        }

        this.text = text;
        this.sender = sender;
        this.tracking_data = tracking_data;
        this.type = type;
        this.attachment = attachment;
    }

    public serialize(): SerializedMessage {
        const obj: any = {};

        if (this.text) {
            obj.text = this.text;
        }

        if (this.sender) {
            obj.sender = this.sender;
        }

        if (this.tracking_data) {
            obj.tracking_data = this.tracking_data;
        }

        if (this.type) {
            obj.type = this.type;
        }

        if (this.attachment) {
            obj.media = this.attachment.media;
            obj.thumbnail = this.attachment.thumbnail;
        }

        return obj;
    }
}
