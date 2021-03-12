import { ISerializable } from '@ebenos/framework';
import { MessageOptions, SerializedTextMessage } from './interfaces';
import { Picture, Carousel } from './attachments';

/** Sender Class */
export class Sender {
    name: string | null;
    avatar: string | null;

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
    public rich_media: Carousel | null;

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
            attachment = null,
            rich_media = null
        } = options;

        if (!(typeof options === 'object')) {
            (text = options),
                (sender = null),
                (tracking_data = null),
                (type = null),
                (attachment = null),
                (rich_media = null);
        }

        this.text = text;
        this.sender = sender;
        this.tracking_data = tracking_data;
        this.type = type;
        this.attachment = attachment;
        this.rich_media = rich_media;
    }

    public serialize(): Partial<SerializedTextMessage> {
        const obj: any = {};

        if (!this.type) {
            if (this.rich_media) {
                obj.type = 'rich_media';
            } else if (this.attachment) {
                this.type = 'picture';
            } else {
                this.type = 'Text';
            }
        } else obj.type = this.type;

        if (this.text) {
            obj.text = this.text;
        }

        if (!this.sender?.name) {
            throw new Error('No sender name given!');
        } else {
            obj.sender = this.sender;
        }

        if (this.tracking_data) {
            obj.tracking_data = this.tracking_data;
        }

        if (this.attachment) {
            obj.media = this.attachment.media;
            obj.thumbnail = this.attachment.thumbnail;
        }

        if (this.rich_media && this.text) {
            throw new Error("Rich media can't be combined with text!");
        }

        if (this.rich_media) {
            obj.rich_media = this.rich_media;
        }

        console.log(obj);
        return obj;
    }
}
