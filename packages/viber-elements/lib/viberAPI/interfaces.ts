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
export type InternalBrowserActionButton =
    | 'forward'
    | 'send'
    | 'open-externally'
    | 'send-to-bot'
    | 'none';
export type InternalBrowserTitleType = 'domain' | 'default';
export type InternalBrowserMode =
    | 'fullscreen'
    | 'fullscreen-portrait'
    | 'fullscreen-landscape'
    | 'partial-size';
export type InternalBrowserFooterType = 'default' | 'hidden';
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
    HeightScale?: number;
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
    ActionButton?: InternalBrowserActionButton;
    ActionPredefinedURL?: string;
    TitleType?: InternalBrowserTitleType;
    CustomTitle?: string;
    Mode?: InternalBrowserMode;
    FooterType?: InternalBrowserFooterType;
    ActionReplyData?: string;
}

export interface ICoordinates {
    Latitude: string;
    Longitude: string;
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
    HeightScale: number;
    ButtonsGroupColumns?: number;
    ButtonsGroupRows?: number;
    BgColor?: string;
}
