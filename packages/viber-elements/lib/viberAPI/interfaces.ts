import { Carousel, Picture, CarouselButton } from './attachments';
import { Keyboard, KeyboardButton } from './keyboard';

export type ScaleType = 'crop' | 'fill' | 'fit';
export type ActionType = 'reply' | 'open-url' | 'location-picker' | 'share-phone' | 'none';
export type TextVAlign = 'top' | 'middle' | 'bottom';
export type TextHAlign = 'left' | 'center' | 'right';
export type MediaType = 'picture' | 'gif';
export type TextSize = 'small' | 'regular' | 'large';
export type InputFieldState = 'regular' | 'minimized' | 'hidden';
export type OpenURLType = 'internal' | 'external';
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

export interface ISender {
    name: string;
    avatar?: string;
}

export interface IMessageOptions {
    sender: ISender;
    tracking_data?: string;
    type?: MessageType;
    text?: string;
    attachment?: Picture;
    rich_media?: Carousel;
    keyboard?: Keyboard;
}

export interface ISerializedTextMessage {
    text?: string;
    type: MessageType;
    sender: ISender;
    tracking_data?: string;
    attachment?: Picture;
    rich_media?: ISerializedCarousel;
    keyboard?: Keyboard;
    min_api_version: string;
}

/** ATTACHMENTS */

export interface IPictureOptions {
    media: string;
    thumbnail?: string;
}

export interface ICarouselOptions {
    ButtonsGroupColumns?: number;
    ButtonsGroupRows?: number;
    BgColor?: string;
    Buttons: CarouselButton[];
}

export interface ICarouselButtonOptions {
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

export interface ISerializedCarouselButton {
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

export interface IKeyboardOptions {
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

export interface IKeyboardButtonOptions extends ICarouselButtonOptions {
    BgColor?: string;
    Silent?: boolean;
    BgMediaType?: MediaType;
    BgMedia?: string;
    BgMediaScaleType?: ScaleType;
    ImageScaleType?: ScaleType;
    BgLoop?: boolean;
    TextPaddings?: number[];
    TextOpacity?: number;
    OpenURLType?: OpenURLType;
    TextBgGradientColor?: string;
    TextShouldFit?: boolean;
    InternalBrowser?: IInternalBrowser;
    Coordinates?: ICoordinates;
    Frame?: IFrame;
    MediaPlayer?: IMediaPlayer;
}

export interface IInternalBrowser {
    ActionButton?: string;
    ActionPredefinedURL?: string;
    TitleType?: string;
    CustomTitle?: string;
    Mode?: string;
    FooterType?: string;
    ActionReplyData?: string;
}

export interface ICoordinates {
    Latitude?: string;
    Longitude?: string;
}

export interface IFrame {
    BorderWidth?: number;
    BorderColor?: string;
    CornerRadius?: number;
}

export interface IMediaPlayer {
    Title?: string;
    Subtitle?: string;
    ThumbnailURL?: string;
    Loop?: boolean;
}

export interface ISerializedCarousel {
    Type: 'rich_media';
    Buttons: ISerializedCarouselButton[];
    ButtonsGroupColumns?: number;
    ButtonsGroupRows?: number;
    BgColor?: string;
}
