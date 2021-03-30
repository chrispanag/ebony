import { ISerializable } from '@ebenos/framework';
import { CarouselButton } from './attachments';
import {
    KeyboardOptions,
    KeyboardButtonOptions,
    InternalBrowser,
    IMap,
    Frame,
    MediaPlayer,
    ScaleType,
    MediaType,
    InputFieldState
} from './interfaces';

/** Viber Keyboard Button */
export class KeyboardButton extends CarouselButton implements ISerializable {
    public BgColor?: string;
    public Silent?: boolean;
    public BgMediaType?: MediaType;
    public BgMedia?: string;
    public BgMediaScaleType?: ScaleType;
    public ImageScaleType?: ScaleType;
    public BgLoop?: boolean;
    public TextPaddings?: number[];
    public TextOpacity?: number;
    public OpenURLType?: string;
    public TextBgGradientColor?: string;
    public TextShouldFit?: boolean;
    public InternalBrowser?: InternalBrowser;
    public Map?: IMap;
    public Frame?: Frame;
    public MediaPlayer?: MediaPlayer;

    constructor(options: KeyboardButtonOptions) {
        super(options);

        const {
            BgColor,
            Silent,
            BgMediaType,
            BgMedia,
            BgMediaScaleType,
            ImageScaleType,
            BgLoop,
            TextPaddings,
            TextOpacity,
            OpenURLType,
            TextBgGradientColor,
            TextShouldFit,
            InternalBrowser,
            Map,
            Frame,
            MediaPlayer
        } = options;

        this.BgColor = BgColor;
        this.Silent = Silent;
        this.BgMediaType = BgMediaType;
        this.BgMedia = BgMedia;
        this.BgMediaScaleType = BgMediaScaleType;
        this.ImageScaleType = ImageScaleType;
        this.BgLoop = BgLoop;
        this.TextPaddings = TextPaddings;
        this.TextOpacity = TextOpacity;
        this.OpenURLType = OpenURLType;
        this.TextBgGradientColor = TextBgGradientColor;
        this.TextShouldFit = TextShouldFit;
        this.InternalBrowser = InternalBrowser;
        this.Map = Map;
        this.Frame = Frame;
        this.MediaPlayer = MediaPlayer;
    }

    public serialize(): any {
        const obj: any = super.serialize();

        if (this.BgColor !== undefined) {
            obj.BgColor = this.BgColor;
        }
        if (this.Silent !== undefined) {
            obj.Silent = this.Silent;
        }
        if (this.BgMediaType !== undefined) {
            obj.BgMediaType = this.BgMediaType;
        }
        if (this.BgMedia !== undefined) {
            obj.BgMedia = this.BgMedia;
        }
        if (this.BgMediaScaleType !== undefined) {
            obj.BgMediaScaleType = this.BgMediaScaleType;
        }
        if (this.ImageScaleType !== undefined) {
            obj.ImageScaleType = this.ImageScaleType;
        }
        if (this.BgLoop !== undefined) {
            obj.BgLoop = this.BgLoop;
        }
        if (this.TextPaddings !== undefined) {
            obj.TextPaddings = this.TextPaddings;
        }
        if (this.TextOpacity !== undefined) {
            obj.TextOpacity = this.TextOpacity;
        }
        if (this.TextSize !== undefined) {
            obj.TextSize = this.TextSize;
        }
        if (this.OpenURLType !== undefined) {
            obj.OpenURLType = this.OpenURLType;
        }
        if (this.TextBgGradientColor !== undefined) {
            obj.TextBgGradientColor = this.TextBgGradientColor;
        }
        if (this.TextShouldFit !== undefined) {
            obj.TextShouldFit = this.TextShouldFit;
        }
        if (this.InternalBrowser !== undefined) {
            obj.InternalBrowser = this.InternalBrowser;
        }
        if (this.Map !== undefined) {
            obj.Map = this.Map;
        }
        if (this.Frame !== undefined) {
            obj.Frame = this.Frame;
        }
        if (this.MediaPlayer !== undefined) {
            obj.MediaPlayer = this.MediaPlayer;
        }

        return obj;
    }
}

/** Viber Keyboard */
export class Keyboard implements ISerializable {
    public Buttons: KeyboardButton[];
    public BgColor?: string;
    public DefaultHeight = false;
    public CustomDefaultHeight?: number;
    public HeightScale = 100;
    public ButtonsGroupColumns = 6;
    public ButtonsGroupRows = 2;
    public InputFieldState: InputFieldState = 'regular';
    public FavoritesMetadata?: string;

    constructor(options: KeyboardOptions) {
        const {
            Buttons,
            BgColor,
            DefaultHeight,
            CustomDefaultHeight,
            HeightScale,
            ButtonsGroupColumns,
            ButtonsGroupRows,
            InputFieldState,
            FavoritesMetadata
        } = options;

        this.Buttons = Buttons;
        this.BgColor = BgColor;
        this.CustomDefaultHeight = CustomDefaultHeight;
        this.FavoritesMetadata = FavoritesMetadata;

        if (ButtonsGroupColumns !== undefined) {
            this.ButtonsGroupColumns = ButtonsGroupColumns;
        }
        if (ButtonsGroupRows !== undefined) {
            this.ButtonsGroupRows = ButtonsGroupRows;
        }
        if (HeightScale !== undefined) {
            this.HeightScale = HeightScale;
        }
        if (DefaultHeight !== undefined) {
            this.DefaultHeight = DefaultHeight;
        }
        if (InputFieldState !== undefined) {
            this.InputFieldState = InputFieldState;
        }
    }

    public serialize(): any {
        const obj: any = {
            Buttons: this.Buttons.map((b: KeyboardButton) => b.serialize()),
            InputFieldState: this.InputFieldState,
            DefaultHeight: this.DefaultHeight,
            HeightScale: this.HeightScale,
            ButtonsGroupColumns: this.ButtonsGroupColumns,
            ButtonsGroupRows: this.ButtonsGroupRows
        };

        if (this.BgColor !== undefined) {
            obj.BgColor = this.BgColor;
        }

        if (this.CustomDefaultHeight !== undefined) {
            obj.CustomDefaultHeight = this.CustomDefaultHeight;
        }

        if (this.FavoritesMetadata !== undefined) {
            obj.FavoritesMetadata = this.FavoritesMetadata;
        }

        return obj;
    }
}
