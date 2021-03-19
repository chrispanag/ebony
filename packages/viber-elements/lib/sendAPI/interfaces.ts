import { Carousel, Picture, CarouselButton } from './attachments';
import { Keyboard, KeyboardButton } from './keyboard';

/** MESSAGE */

export interface Sender {
    name: string;
    avatar?: string;
}

export interface MessageOptions {
    sender: Sender;
    tracking_data?: string;
    type?: string;
    text?: string;
    attachment?: Picture;
    rich_media?: Carousel;
    keyboard?: Keyboard;
}

export interface SerializedTextMessage {
    text: string;
    type?: string;
    sender: Sender;
    tracking_data?: string;
    attachment?: Picture;
    rich_media?: Carousel;
    keyboard?: Keyboard;
}

/** ATTACHMENTS */

export interface PictureOptions {
    media: string;
    thumbnail?: string;
}

export interface CarouselOptions {
    Type: string;
    ButtonsGroupColumns?: number;
    ButtonsGroupRows?: number;
    BgColor?: string;
    Buttons: CarouselButton[];
}

export interface CarouselButtonOptions {
    Columns?: number;
    Rows?: number;
    ActionType?: string;
    ActionBody: string;
    Image?: string;
    Text?: string;
    TextSize?: string;
    TextVAlign?: string;
    TextHAlign?: string;
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

/** KEYBOARD */

export interface KeyboardOptions {
    Buttons: KeyboardButton[];
    BgColor?: string;
    DefaultHeight?: boolean;
    CustomDefaultHeight?: number;
    HeightScale?: number;
    ButtonsGroupColumns?: number;
    ButtonsGroupRows?: number;
    InputFieldState?: string;
    FavoritesMetadata?: string;
}

export interface KeyboardButtonOptions {
    Columns?: number;
    Rows?: number;
    BgColor?: string;
    Silent?: boolean;
    BgMediaType?: string;
    BgMedia?: string;
    BgMediaScaleType?: string;
    ImageScaleType?: string;
    BgLoop?: boolean;
    ActionType?: string;
    ActionBody: string;
    Image?: string;
    Text?: string;
    TextVAlign?: string;
    TextHAlign?: string;
    TextPaddings?: number[];
    TextOpacity?: number;
    TextSize?: string;
    OpenURLType?: string;
    TextBgGradientColor?: string;
    TextShouldFit?: boolean;
    InternalBrowser?: InternalBrowser;
    Map?: Map;
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

export interface Map {
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
