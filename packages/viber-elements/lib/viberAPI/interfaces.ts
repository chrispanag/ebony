import { RichMedia, Picture, Button } from './attachments';
import { Carousel } from './carousel';
import { Keyboard } from './keyboard';

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
    | 'RichMedia content'
    | 'rich_media'
    | 'url';
export type OpenURLMediaType = 'not-media' | 'video' | 'gif' | 'picture';

/** MESSAGE */

export interface ISender {
    name: string;
    avatar?: string;
}

export interface IMessageOptions {
    sender: ISender;
    tracking_data?: string | Record<string, any>;
    type?: MessageType;
    text?: string;
    attachment?: Picture;
    rich_media?: RichMedia | Carousel;
    keyboard?: Keyboard;
}

export interface ISerializedTextMessage {
    text?: string;
    type: MessageType;
    sender: ISender;
    tracking_data?: string;
    attachment?: Picture;
    rich_media?: ISerializedRichMedia;
    keyboard?: ISerializedKeyboard;
    min_api_version: string;
}

export interface IURLOptions {
    sender: ISender;
    media: string;
    tracking_data?: string | Record<string, any>;
    type?: MessageType;
    keyboard?: Keyboard;
}

export interface ISerializedURL {
    text?: string;
    type: MessageType;
    sender: ISender;
    media: string;
    tracking_data?: string;
    keyboard?: ISerializedKeyboard;
    min_api_version: string;
}

/** ATTACHMENTS */

export interface IPictureOptions {
    media: string;
    thumbnail?: string;
}

export interface IRichMediaOptions {
    ButtonsGroupColumns?: number;
    ButtonsGroupRows?: number;
    BgColor?: string;
    Buttons: Button[];
    HeightScale?: number;
}

/** KEYBOARD */

export interface IKeyboardOptions {
    Buttons: Button[];
    BgColor?: string;
    DefaultHeight?: boolean;
    CustomDefaultHeight?: number;
    ButtonsGroupColumns?: number;
    ButtonsGroupRows?: number;
    InputFieldState?: InputFieldState;
    FavoritesMetadata?: string;
}

export interface IButtonOptions {
    Columns?: number;
    Rows?: number;
    ActionType?: ActionType;
    ActionBody: string;
    Image?: string;
    Text?: string;
    TextSize?: TextSize;
    TextVAlign?: TextVAlign;
    TextHAlign?: TextHAlign;
    Silent?: boolean;
    BgColor?: string;
    BgMediaType?: MediaType;
    BgMedia?: string;
    BgMediaScaleType?: ScaleType;
    ImageScaleType?: ScaleType;
    BgLoop?: boolean;
    TextPaddings?: number[];
    TextOpacity?: number;
    OpenURLType?: OpenURLType;
    OpenURLMediaType?: OpenURLMediaType;
    TextBgGradientColor?: string;
    TextShouldFit?: boolean;
    InternalBrowser?: IInternalBrowser;
    Map?: ICoordinates;
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

export interface ISerializedKeyboard {
    Buttons: ISerializedButton[];
    InputFieldState: InputFieldState;
    DefaultHeight: boolean;
    ButtonsGroupColumns: number;
    ButtonsGroupRows: number;
    BgColor?: string;
    CustomDefaultHeight?: number;
    FavoritesMetadata?: string;
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

export interface ISerializedButton {
    Columns?: number;
    Rows?: number;
    ActionType?: ActionType;
    ActionBody: string;
    Image?: string;
    Text?: string;
    TextSize?: TextSize;
    TextVAlign?: TextVAlign;
    TextHAlign?: TextHAlign;
    Silent?: boolean;
    BgColor?: string;
    BgMediaType?: MediaType;
    BgMedia?: string;
    BgMediaScaleType?: ScaleType;
    ImageScaleType?: ScaleType;
    BgLoop?: boolean;
    TextPaddings?: number[];
    TextOpacity?: number;
    OpenURLType?: OpenURLType;
    OpenURLMediaType?: OpenURLMediaType;
    TextBgGradientColor?: string;
    TextShouldFit?: boolean;
    InternalBrowser?: IInternalBrowser;
    Map?: ICoordinates;
    Frame?: IFrame;
    MediaPlayer?: IMediaPlayer;
}

export interface ISerializedRichMedia {
    Type: 'rich_media';
    Buttons: ISerializedButton[];
    HeightScale: number;
    ButtonsGroupColumns?: number;
    ButtonsGroupRows?: number;
    BgColor?: string;
}
