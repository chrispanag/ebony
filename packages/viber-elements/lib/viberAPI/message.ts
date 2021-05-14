import { ISerializable } from '@ebenos/framework';
import {
    IMessageOptions,
    ISender,
    MessageType,
    ISerializedMessage,
    ISerializedGeneralMessage
} from './interfaces';
import { Picture, RichMedia } from './attachments';
import { Keyboard } from './keyboard';
import { Carousel } from './carousel';

/** Message Class */
export class Message implements ISerializable {
    public sender: ISender;
    public tracking_data?: string | Record<string, any>;
    public type: MessageType;
    public text?: string;
    public attachment?: Picture;
    public rich_media?: RichMedia | Carousel;
    public keyboard?: Keyboard;
    public media?: string;

    /**
     * Create a message
     * @param {MessageOptions|string} options - The message elements
     */
    constructor(options: IMessageOptions) {
        const { sender, tracking_data, attachment, keyboard } = options;
        this.sender = sender;
        this.tracking_data = tracking_data;
        this.attachment = attachment;
        this.keyboard = keyboard;

        if ('media' in options) {
            const { media } = options;
            this.media = media;
            this.type = 'url';
        } else if ('rich_media' in options) {
            const { rich_media } = options;
            this.rich_media = rich_media;
            this.type = 'rich_media';
        } else {
            const { text } = options;
            this.text = text;
            this.type = 'text';
        }
    }

    private determineType(): MessageType {
        if (this.type) {
            return this.type;
        } else {
            throw new Error('Cannot determine message type!');
        }
    }

    public serialize(): ISerializedMessage {
        /*
         *   Common for all Serialized messages
         **/
        const obj: ISerializedGeneralMessage = {
            type: this.determineType(),
            sender: this.sender,
            min_api_version: '7'
        };

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

        if (this.keyboard !== undefined) {
            obj.keyboard = this.keyboard.serialize();
        }
        /*
         *   Properties that depend on the type of message
         **/
        // let objR: Partial<ISerializedMessage> = obj;

        switch (this.type) {
            case 'text':
                if (this.text === undefined) {
                    throw new Error('This should never happen');
                }
                return { ...obj, text: this.text };
            case 'rich_media':
                if (this.rich_media === undefined) {
                    throw new Error('This should never happen');
                }
                return { ...obj, rich_media: this.rich_media.serialize() };
            case 'url':
                if (this.media === undefined) {
                    throw new Error('This should never happen');
                }
                return { ...obj, media: this.media };
        }

        throw new Error('This should never happen');
    }
}
