import { ISerializable } from '@ebenos/framework';
import { CarouselButton } from './attachments';
import {
    KeyboardOptions,
    KeyboardButtonOptions,
    InternalBrowser,
    Map,
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
    public Map?: Map;
    public Frame?: Frame;
    public MediaPlayer?: MediaPlayer;

    constructor(options: KeyboardButtonOptions) {
        const {
            Columns,
            Rows,
            BgColor,
            Silent,
            BgMediaType,
            BgMedia,
            BgMediaScaleType,
            ImageScaleType,
            BgLoop,
            ActionType,
            ActionBody,
            Image,
            Text,
            TextVAlign,
            TextHAlign,
            TextPaddings,
            TextOpacity,
            TextSize,
            OpenURLType,
            TextBgGradientColor,
            TextShouldFit,
            InternalBrowser,
            Map,
            Frame,
            MediaPlayer
        } = options;

        super({
            Columns: options.Columns,
            Rows: options.Rows,
            ActionType: options.ActionType,
            ActionBody: options.ActionBody,
            Image: options.Image,
            Text: options.Text,
            TextSize: options.TextSize,
            TextVAlign: options.TextVAlign,
            TextHAlign: options.TextHAlign
        });

        this.Columns = Columns;
        this.Rows = Rows;
        this.BgColor = BgColor;
        this.Silent = Silent;
        this.BgMediaType = BgMediaType;
        this.BgMedia = BgMedia;
        this.BgMediaScaleType = BgMediaScaleType;
        this.ImageScaleType = ImageScaleType;
        this.BgLoop = BgLoop;

        if (ActionType) {
            this.ActionType = ActionType;
        }
        this.ActionBody = ActionBody;
        this.Image = Image;
        this.Text = Text;
        this.TextVAlign = TextVAlign;
        this.TextHAlign = TextHAlign;
        this.TextPaddings = TextPaddings;
        this.TextOpacity = TextOpacity;
        this.TextSize = TextSize;
        this.OpenURLType = OpenURLType;
        this.TextBgGradientColor = TextBgGradientColor;
        this.TextShouldFit = TextShouldFit;
        this.InternalBrowser = InternalBrowser;
        this.Map = Map;
        this.Frame = Frame;
        this.MediaPlayer = MediaPlayer;
    }

    public serialize(): any {
        const obj: any = {};

        if (this.Columns !== undefined) {
            obj.Columns = this.Columns;
        }

        if (this.Rows !== undefined) {
            obj.Rows = this.Rows;
        }

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
        if (this.ActionType !== undefined) {
            obj.ActionType = this.ActionType;
        }

        if (!this.ActionBody) {
            throw new Error('Action body for Keyboard Button is required!');
        }

        if (this.ActionBody !== undefined) {
            obj.ActionBody = this.ActionBody;
        }

        if (this.Image !== undefined) {
            obj.Image = this.Image;
        }
        if (this.Text !== undefined) {
            obj.Text = this.Text;
        }
        if (this.TextVAlign !== undefined) {
            obj.TextVAlign = this.TextVAlign;
        }
        if (this.TextHAlign !== undefined) {
            obj.TextHAlign = this.TextHAlign;
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
        const obj: any = {};
        obj.Buttons = this.Buttons.map((b: KeyboardButton) => b.serialize());
        obj.InputFieldState = this.InputFieldState;
        obj.DefaultHeight = this.DefaultHeight;

        if (this.BgColor !== undefined) {
            obj.BgColor = this.BgColor;
        }

        if (this.CustomDefaultHeight !== undefined) {
            obj.CustomDefaultHeight = this.CustomDefaultHeight;
        }

        if (this.HeightScale !== undefined) {
            obj.HeightScale = this.HeightScale;
        }

        if (this.ButtonsGroupColumns !== undefined) {
            obj.ButtonsGroupColumns = this.ButtonsGroupColumns;
        }

        if (this.ButtonsGroupRows !== undefined) {
            obj.ButtonsGroupRows = this.ButtonsGroupRows;
        }

        if (this.FavoritesMetadata !== undefined) {
            obj.FavoritesMetadata = this.FavoritesMetadata;
        }

        return obj;
    }
}
