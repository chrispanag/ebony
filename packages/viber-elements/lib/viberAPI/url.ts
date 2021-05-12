import { ISerializable } from '@ebenos/framework';
import { ISender, MessageType, IURLOptions, ISerializedURL } from './interfaces';
import { Keyboard } from './keyboard';

/** URL Class */
export class URL implements ISerializable {
    public sender: ISender;
    public media: string;
    public tracking_data?: string | Record<string, any>;
    public type?: MessageType;
    public keyboard?: Keyboard;

    constructor(options: IURLOptions) {
        const { sender, media, tracking_data, type, keyboard } = options;

        this.sender = sender;
        this.tracking_data = tracking_data;
        this.type = type;
        this.media = media;
        this.keyboard = keyboard;
    }

    public serialize(): ISerializedURL {
        const obj: ISerializedURL = {
            type: 'url',
            sender: this.sender,
            min_api_version: '7',
            media: this.media
        };

        if (this.tracking_data !== undefined) {
            if (typeof this.tracking_data === 'string') {
                obj.tracking_data = this.tracking_data;
            } else {
                obj.tracking_data = JSON.stringify(this.tracking_data);
            }
        }

        if (this.keyboard !== undefined) {
            obj.keyboard = this.keyboard.serialize();
        }

        return obj;
    }
}
