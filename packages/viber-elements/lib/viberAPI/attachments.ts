import {
    CarouselOptions,
    CarouselButtonOptions,
    PictureOptions,
    SerializedCarouselButton,
    ActionType,
    TextVAlign,
    TextHAlign,
    TextSize
} from './interfaces';
import { ISerializable } from '@ebenos/framework';

/**Viber Carousel Button */
export class CarouselButton implements ISerializable {
    public Columns?: number;
    public Rows?: number;
    public ActionType: ActionType = 'reply';
    public ActionBody: string;
    public Image?: string;
    public Text?: string;
    public TextSize?: TextSize;
    public TextVAlign?: TextVAlign = 'middle';
    public TextHAlign?: TextHAlign = 'center';

    constructor(options: CarouselButtonOptions) {
        const {
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

        this.Columns = Columns;
        this.Rows = Rows;
        this.ActionBody = ActionBody;
        this.Image = Image;
        this.Text = Text;
        this.TextSize = TextSize;
        this.TextVAlign = TextVAlign;
        this.TextHAlign = TextHAlign;

        if (ActionType !== undefined) {
            this.ActionType = ActionType;
        }
    }

    public serialize(): SerializedCarouselButton {
        const obj: any = {};

        obj.ActionType = this.ActionType;

        if (this.Columns !== undefined) {
            obj.Columns = this.Columns;
        }

        if (this.Rows !== undefined) {
            obj.Rows = this.Rows;
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
    public ButtonsGroupColumns?: number;
    public ButtonsGroupRows?: number;
    public BgColor?: string;
    public Buttons: CarouselButton[];

    constructor(options: CarouselOptions) {
        const { ButtonsGroupColumns, ButtonsGroupRows, BgColor, Buttons } = options;

        this.ButtonsGroupColumns = ButtonsGroupColumns;
        this.ButtonsGroupRows = ButtonsGroupRows;
        this.BgColor = BgColor;
        this.Buttons = Buttons;
    }

    public serialize(): any {
        const obj: any = {
            type: 'rich_media'
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

        if (this.Buttons !== undefined) {
            obj.Buttons = this.Buttons.map((b: CarouselButton) => b.serialize());
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

    public serialize(): any {
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
