import { ISerializable } from '@ebenos/framework';
import { MessageOptions, SerializedTextMessage, Sender } from './interfaces';
import { Picture, Carousel } from './attachments';
import { Keyboard } from './keyboard';

/** Message Class */
export class Message implements ISerializable {
    public sender?: Sender;
    public tracking_data?: string;
    public type?: string;
    public text?: string;
    public attachment?: Picture;
    public rich_media?: Carousel;
    public keyboard?: Keyboard;

    /**
     * Create a message
     * @param {MessageOptions|string} options - The message elements
     */
    constructor(options: MessageOptions = {}) {
        let { text, sender, tracking_data, type, attachment, rich_media, keyboard } = options;

        if (!(typeof options === 'object')) {
            (text = options),
                (sender = options),
                (tracking_data = options),
                (type = options),
                (attachment = options),
                (keyboard = options),
                (rich_media = options);
        }

        this.text = text;
        this.sender = sender;
        this.tracking_data = tracking_data;
        this.type = type;
        this.attachment = attachment;
        this.rich_media = rich_media;
        this.keyboard = keyboard;
    }

    public serialize(): Partial<SerializedTextMessage> {
        const obj: Partial<SerializedTextMessage> = {};

        if (!this.type) {
            if (this.rich_media !== undefined) {
                obj.type = 'rich_media';
            } else if (this.attachment !== undefined) {
                this.type = 'picture';
            } else {
                this.type = 'Text';
            }
        } else obj.type = this.type;

        if (this.text !== undefined) {
            obj.text = this.text;
        }

        if (!this.sender?.name) {
            throw new Error('No sender name given!');
        } else {
            obj.sender = this.sender;
        }

        if (this.tracking_data !== undefined) {
            obj.tracking_data = this.tracking_data;
        }

        if (this.attachment !== undefined) {
            obj.attachment = this.attachment;
        }

        if (this.rich_media !== undefined && this.text !== undefined) {
            throw new Error("Rich media can't be combined with text!");
        }

        if (this.rich_media !== undefined) {
            obj.rich_media = this.rich_media;
        }

        if (this.keyboard !== undefined) {
            obj.keyboard = this.keyboard;
        }

        return obj;
    }
}
