import { Carousel, Picture, CarouselButton } from './attachments';
import { Keyboard, KeyboardButton } from './keyboard';

export type ScaleType = 'crop' | 'fill' | 'fit';
export type ActionType = 'reply' | 'open-url' | 'location-picker' | 'share-phone' | 'none';
export type TextVAlign = 'top' | 'middle' | 'bottom';
export type TextHAlign = 'left' | 'center' | 'right';
export type MediaType = 'picture' | 'gif';
export type TextSize = 'small' | 'regular' | 'large';
export type InputFieldState = 'regular' | 'minimized' | 'hidden';
export type MessageType =
    | 'text'
    | 'picture'
    | 'video'
    | 'file'
    | 'location'
    | 'contact'
    | 'sticker'
    | 'carousel content'
    | 'rich_media'
    | 'url';

/** MESSAGE */

export interface Sender {
    name: string;
    avatar?: string;
}

export interface MessageOptions {
    sender: Sender;
    tracking_data?: string;
    type?: MessageType;
    text?: string;
    attachment?: Picture;
    rich_media?: Carousel;
    keyboard?: Keyboard;
}

export interface SerializedTextMessage {
    text?: string;
    type: MessageType;
    sender: Sender;
    tracking_data?: string;
    attachment?: Picture;
    rich_media?: Carousel;
    keyboard?: Keyboard;
    min_api_version: string;
}

/** ATTACHMENTS */

export interface PictureOptions {
    media: string;
    thumbnail?: string;
}

export interface CarouselOptions {
    ButtonsGroupColumns?: number;
    ButtonsGroupRows?: number;
    BgColor?: string;
    Buttons: CarouselButton[];
}

export interface CarouselButtonOptions {
    Columns?: number;
    Rows?: number;
    ActionType?: ActionType;
    ActionBody: string;
    Image?: string;
    Text?: string;
    TextSize?: TextSize;
    TextVAlign?: TextVAlign;
    TextHAlign?: TextHAlign;
}

export interface SerializedCarouselButton {
    Columns?: number;
    Rows?: number;
    ActionType?: ActionType;
    ActionBody: string;
    Image?: string;
    Text?: string;
    TextSize?: TextSize;
    TextVAlign?: TextVAlign;
    TextHAlign?: TextHAlign;
}

/** KEYBOARD */

export interface KeyboardOptions {
    Buttons: KeyboardButton[];
    BgColor?: string;
    DefaultHeight?: boolean;
    CustomDefaultHeight?: number;
    HeightScale?: number;
    ButtonsGroupColumns?: number;
    ButtonsGroupRows?: number;
    InputFieldState?: InputFieldState;
    FavoritesMetadata?: string;
}

export interface KeyboardButtonOptions {
    Columns?: number;
    Rows?: number;
    BgColor?: string;
    Silent?: boolean;
    BgMediaType?: MediaType;
    BgMedia?: string;
    BgMediaScaleType?: ScaleType;
    ImageScaleType?: ScaleType;
    BgLoop?: boolean;
    ActionType?: ActionType;
    ActionBody: string;
    Image?: string;
    Text?: string;
    TextVAlign?: TextVAlign;
    TextHAlign?: TextHAlign;
    TextPaddings?: number[];
    TextOpacity?: number;
    TextSize?: TextSize;
    OpenURLType?: 'internal' | 'external';
    TextBgGradientColor?: string;
    TextShouldFit?: boolean;
    InternalBrowser?: InternalBrowser;
    Map?: IMap;
    Frame?: Frame;
    MediaPlayer?: MediaPlayer;
}

export interface InternalBrowser {
    ActionButton?: string;
    ActionPredefinedURL?: string;
    TitleType?: string;
    CustomTitle?: string;
    Mode?: string;
    FooterType?: string;
    ActionReplyData?: string;
}

export interface IMap {
    Latitude?: string;
    Longitude?: string;
}

export interface Frame {
    BorderWidth?: number;
    BorderColor?: string;
    CornerRadius?: number;
}

export interface MediaPlayer {
    Title?: string;
    Subtitle?: string;
    ThumbnailURL?: string;
    Loop?: boolean;
}
