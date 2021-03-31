import {
    ICarouselOptions,
    IPictureOptions,
    ActionType,
    TextVAlign,
    TextHAlign,
    TextSize,
    ISerializedCarousel,
    MediaType,
    ScaleType,
    OpenURLType,
    IInternalBrowser,
    ICoordinates,
    IFrame,
    IMediaPlayer,
    IButtonOptions,
    OpenURLMediaType,
    ISerializedButton
} from './interfaces';
import { ISerializable } from '@ebenos/framework';

/**Viber Carousel Button */
export class Button implements ISerializable {
    public Columns = 6;
    public Rows = 1;
    public ActionType: ActionType = 'reply';
    public ActionBody: string;
    public Image?: string;
    public Text?: string;
    public TextSize: TextSize = 'regular';
    public TextVAlign: TextVAlign = 'middle';
    public TextHAlign: TextHAlign = 'center';
    public Silent = false;
    public BgColor?: string;
    public BgMediaType?: MediaType;
    public BgMedia?: string;
    public BgMediaScaleType?: ScaleType;
    public ImageScaleType?: ScaleType;
    public BgLoop = true;
    public TextPaddings?: number[];
    public TextOpacity = 100;
    public OpenURLType: OpenURLType = 'internal';
    public OpenURLMediaType: OpenURLMediaType = 'not-media';
    public TextBgGradientColor?: string;
    public TextShouldFit = false;
    public InternalBrowser?: IInternalBrowser;
    public Map?: ICoordinates;
    public Frame?: IFrame;
    public MediaPlayer?: IMediaPlayer;

    constructor(o: IButtonOptions) {
        if (o.Columns !== undefined) {
            this.Columns = o.Columns;
        }
        if (o.Rows !== undefined) {
            this.Rows = o.Rows;
        }
        if (o.TextSize !== undefined) {
            this.TextSize = o.TextSize;
        }
        if (o.Silent !== undefined) {
            this.Silent = o.Silent;
        }
        if (o.TextVAlign !== undefined) {
            this.TextVAlign = o.TextVAlign;
        }
        if (o.TextHAlign !== undefined) {
            this.TextHAlign = o.TextHAlign;
        }
        if (o.ActionType !== undefined) {
            this.ActionType = o.ActionType;
        }
        if (o.BgLoop !== undefined) {
            this.BgLoop = o.BgLoop;
        }
        if (o.TextOpacity !== undefined) {
            this.TextOpacity = o.TextOpacity;
        }
        if (o.OpenURLType !== undefined) {
            this.OpenURLType = o.OpenURLType;
        }
        if (o.TextShouldFit !== undefined) {
            this.TextShouldFit = o.TextShouldFit;
        }

        this.ActionBody = o.ActionBody;
        this.Image = o.Image;
        this.Text = o.Text;
        this.BgColor = o.BgColor;
        this.BgMediaType = o.BgMediaType;
        this.BgMedia = o.BgMedia;
        this.BgMediaScaleType = o.BgMediaScaleType;
        this.ImageScaleType = o.ImageScaleType;
        this.TextPaddings = o.TextPaddings;
        this.TextBgGradientColor = o.TextBgGradientColor;
        this.InternalBrowser = o.InternalBrowser;
        this.Map = o.Map;
        this.Frame = o.Frame;
        this.MediaPlayer = o.MediaPlayer;
    }

    public serialize(): ISerializedButton {
        const obj: ISerializedButton = {
            ActionType: this.ActionType,
            TextVAlign: this.TextVAlign,
            TextHAlign: this.TextHAlign,
            ActionBody: this.ActionBody,
            TextSize: this.TextSize,
            Silent: this.Silent,
            Columns: this.Columns,
            BgLoop: this.BgLoop,
            TextOpacity: this.TextOpacity,
            OpenURLType: this.OpenURLType,
            OpenURLMediaType: this.OpenURLMediaType,
            TextShouldFit: this.TextShouldFit,
            Rows: this.Rows
        };

        if (this.Image !== undefined) {
            obj.Image = this.Image;
        }
        if (this.Text !== undefined) {
            obj.Text = this.Text;
        }
        if (this.BgColor !== undefined) {
            obj.BgColor = this.BgColor;
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
        if (this.TextPaddings !== undefined) {
            obj.TextPaddings = this.TextPaddings;
        }
        if (this.TextOpacity !== undefined) {
            obj.TextOpacity = this.TextOpacity;
        }
        if (this.TextSize !== undefined) {
            obj.TextSize = this.TextSize;
        }
        if (this.TextBgGradientColor !== undefined) {
            obj.TextBgGradientColor = this.TextBgGradientColor;
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

/** Viber Carousel Attachment */
export class Carousel implements ISerializable {
    public ButtonsGroupColumns?: number;
    public ButtonsGroupRows?: number;
    public BgColor?: string;
    public Buttons: Button[];
    public HeightScale = 100;

    constructor(options: ICarouselOptions) {
        const { ButtonsGroupColumns, ButtonsGroupRows, BgColor, Buttons, HeightScale } = options;

        this.ButtonsGroupColumns = ButtonsGroupColumns;
        this.ButtonsGroupRows = ButtonsGroupRows;
        this.BgColor = BgColor;
        this.Buttons = Buttons;

        if (HeightScale !== undefined) {
            this.HeightScale = HeightScale;
        }
    }

    public serialize(): ISerializedCarousel {
        const obj: ISerializedCarousel = {
            Type: 'rich_media',
            Buttons: this.Buttons.map((b) => b.serialize()),
            HeightScale: this.HeightScale
        };

        if (this.ButtonsGroupColumns !== undefined) {
            obj.ButtonsGroupColumns = this.ButtonsGroupColumns;
        }

        if (this.ButtonsGroupRows !== undefined) {
            obj.ButtonsGroupRows = this.ButtonsGroupRows;
        }

        if (this.BgColor !== undefined) {
            obj.BgColor = this.BgColor;
        }

        return obj;
    }
}

/** Viber Image Attachment */
export class Picture implements ISerializable {
    public media: string;
    public thumbnail?: string;

    /**
     *
     * @param media - (Required) URL of the image
     * @param thumbnail - URL of a reduced size image
     */
    constructor(options: IPictureOptions) {
        const { media, thumbnail } = options;

        this.media = media;
        this.thumbnail = thumbnail;
    }

    public serialize(): any {
        const obj: any = {
            media: this.media
        };

        if (this.thumbnail !== undefined) {
            obj.thumbnail = this.thumbnail;
        }

        return obj;
    }
}
