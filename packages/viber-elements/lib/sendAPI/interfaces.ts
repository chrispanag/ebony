import { Carousel, Picture } from './attachments';

export interface Sender {
    name?: string;
    avatar?: string;
}

export interface MessageOptions {
    sender?: Sender;
    tracking_data?: string;
    type?: string;
    text?: string;
    attachment?: Picture;
    rich_media?: Carousel;
}

export interface SerializedTextMessage {
    text: string;
    type?: string;
    sender: Sender;
    tracking_data?: string;
    attachment?: Picture;
    rich_media?: Carousel;
}

export interface SerializedCarouselButton {
    Columns?: number;
    Rows?: number;
    ActionType?: string;
    ActionBody?: string;
    Image?: string;
    Text?: string;
    TextSize?: string;
    TextVAlign?: string;
    TextHAlign?: string;
}
