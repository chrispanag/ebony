import { ISerializable } from '@ebenos/framework';
import { IMessageOptions, ISender, MessageType, ISerializedTextMessage } from './interfaces';
import { Picture, Carousel } from './attachments';
import { Keyboard } from './keyboard';

/** Message Class */
export class Message implements ISerializable {
    public sender: ISender;
    public tracking_data?: string | Record<string, any>;
    public type?: MessageType;
    public text?: string;
    public attachment?: Picture;
    public rich_media?: Carousel;
    public keyboard?: Keyboard;

    /**
     * Create a message
     * @param {MessageOptions|string} options - The message elements
     */
    constructor(options: IMessageOptions) {
        const { text, sender, tracking_data, type, attachment, rich_media, keyboard } = options;

        this.text = text;
        this.sender = sender;
        this.tracking_data = tracking_data;
        this.type = type;
        this.attachment = attachment;
        this.rich_media = rich_media;
        this.keyboard = keyboard;
    }

    private determineType(): MessageType {
        if (this.type !== undefined) {
            return this.type;
        }
        if (this.rich_media !== undefined) {
            return 'rich_media';
        }
        if (this.attachment !== undefined) {
            return 'picture';
        }
        if (this.text !== undefined) {
            return 'text';
        }

        throw new Error('Cannot determine message type!');
    }

    public serialize(): ISerializedTextMessage {
        if (this.rich_media !== undefined && this.text !== undefined) {
            throw new Error("Rich media can't be combined with text!");
        }

        const obj: ISerializedTextMessage = {
            type: this.determineType(),
            sender: this.sender,
            min_api_version: '7'
        };

        if (this.text !== undefined) {
            obj.text = this.text;
        }

        if (this.tracking_data !== undefined) {
            if (typeof this.tracking_data === 'string') {
                obj.tracking_data = this.tracking_data;
            } else {
                obj.tracking_data = JSON.stringify(this.tracking_data);
            }
        }

        if (this.attachment !== undefined) {
            obj.attachment = this.attachment.serialize();
        }

        if (this.rich_media !== undefined) {
            obj.rich_media = this.rich_media.serialize();
        }

        if (this.keyboard !== undefined) {
            obj.keyboard = this.keyboard.serialize();
        }

        return obj;
    }
}
