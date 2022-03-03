export type MessageType =
    | 'text'
    | 'picture'
    | 'video'
    | 'file'
    | 'sticker'
    | 'contact'
    | 'url'
    | 'location';

export interface IViberMessage {
    type: MessageType;
    tracking_data: string;
}

export interface IViberTextMessage extends IViberMessage {
    type: 'text';
    text: string;
}

export interface IViberMediaMessage extends IViberMessage {
    type: 'picture' | 'video' | 'file' | 'url';
    media: string;
}

export interface IViberPictureMessage extends IViberMediaMessage {
    type: 'picture';
}

export interface IViberVideoMessage extends IViberMediaMessage {
    type: 'video';
    duration: number;
}

export interface IViberFileMessage extends IViberMediaMessage {
    type: 'file';
    file_name: string;
    file_size: number;
}

export interface IViberStickerMessage extends IViberMessage {
    type: 'sticker';
    sticker_id: string;
}

export interface IViberContactMessage extends IViberMessage {
    type: 'contact';
    text: string;
    contact: {
        name?: string;
        phone_number: string;
        avatar?: string;
    };
}

export interface IViberLocationMessage extends IViberMessage {
    type: 'location';
    text: string;
    location: {
        lat: number;
        lon: number;
    };
}

export type MessageData =
    | IViberTextMessage
    | IViberPictureMessage
    | IViberVideoMessage
    | IViberFileMessage
    | IViberStickerMessage
    | IViberContactMessage
    | IViberLocationMessage;

export function isMediaMessage(message: IViberMessage): message is IViberMediaMessage {
    return (
        message.type === 'picture' ||
        message.type === 'url' ||
        message.type === 'file' ||
        message.type === 'video'
    );
}
