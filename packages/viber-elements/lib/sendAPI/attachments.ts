import { CarouselOptions, CarouselButtonOptions, PictureOptions } from './interfaces';
import { ISerializable } from '@ebenos/framework';

/**Viber Carousel Button */
export class CarouselButton implements ISerializable {
    public Columns?: number;
    public Rows?: number;
    public ActionType?: string;
    public ActionBody: string;
    public Image?: string;
    public Text?: string;
    public TextSize?: string;
    public TextVAlign?: string;
    public TextHAlign?: string;

    constructor(options: CarouselButtonOptions) {
        let {
            Columns,
            Rows,
            ActionType,
            ActionBody,
            Image,
            Text,
            TextSize,
            TextVAlign,
            TextHAlign
        } = options;

        if (!(typeof options === 'object')) {
            (Columns = options),
                (Rows = options),
                (ActionType = options),
                (ActionBody = options),
                (Image = options),
                (Text = options),
                (TextSize = options),
                (TextVAlign = options),
                (TextHAlign = options);
        }

        this.Columns = Columns;
        this.Rows = Rows;
        this.ActionType = ActionType;
        this.ActionBody = ActionBody;
        this.Image = Image;
        this.Text = Text;
        this.TextSize = TextSize;
        this.TextVAlign = TextVAlign;
        this.TextHAlign = TextHAlign;
    }

    public serialize() {
        const obj: any = {};

        if (this.Columns !== undefined) {
            obj.Columns = this.Columns;
        }

        if (this.Rows !== undefined) {
            obj.Rows = this.Rows;
        }

        if (this.ActionType !== undefined) {
            obj.ActionType = this.ActionType;
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

        if (this.TextSize !== undefined) {
            obj.TextSize = this.TextSize;
        }

        if (this.TextVAlign !== undefined) {
            obj.TextVAlign = this.TextVAlign;
        }

        if (this.TextHAlign !== undefined) {
            obj.TextHAlign = this.TextHAlign;
        }

        return obj;
    }
}

/** Viber Carousel Attachment */
export class Carousel implements ISerializable {
    public Type: string;
    public ButtonsGroupColumns?: number;
    public ButtonsGroupRows?: number;
    public BgColor?: string;
    public Buttons: CarouselButton[];

    constructor(options: CarouselOptions) {
        let { Type, ButtonsGroupColumns, ButtonsGroupRows, BgColor, Buttons } = options;

        if (!(typeof options === 'object')) {
            (Type = options),
                (ButtonsGroupColumns = options),
                (ButtonsGroupRows = options),
                (BgColor = options),
                (Buttons = options);
        }

        this.Type = Type;
        this.ButtonsGroupColumns = ButtonsGroupColumns;
        this.ButtonsGroupRows = ButtonsGroupRows;
        this.BgColor = BgColor;
        this.Buttons = Buttons;
    }

    public serialize() {
        const obj: any = {};

        if (this.Type !== undefined) {
            obj.Type = this.Type;
        }

        if (this.ButtonsGroupColumns !== undefined) {
            obj.ButtonsGroupColumns = this.ButtonsGroupColumns;
        }

        if (this.ButtonsGroupRows !== undefined) {
            obj.ButtonsGroupRows = this.ButtonsGroupRows;
        }

        if (this.BgColor !== undefined) {
            obj.BgColor = this.BgColor;
        }

        if (this.Buttons !== undefined) {
            obj.Buttons = this.Buttons;
            for (const button of obj.Buttons) {
                button.serialize();
            }
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
    constructor(options: PictureOptions) {
        let { media, thumbnail } = options;

        if (!(typeof options === 'object')) {
            (media = options), (thumbnail = options);
        }

        this.media = media;
        this.thumbnail = thumbnail;
    }

    public serialize() {
        const obj: any = {};

        if (!this.media) {
            throw new Error('Media must be specified!');
        } else {
            obj.media = this.media;
        }

        if (this.thumbnail !== undefined) {
            obj.thumbnail = this.thumbnail;
        }

        return obj;
    }
}
