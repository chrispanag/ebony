import {
    ICarouselOptions,
    ICarouselButtonOptions,
    IPictureOptions,
    ISerializedCarouselButton,
    ActionType,
    TextVAlign,
    TextHAlign,
    TextSize,
    ISerializedCarousel
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
    public TextVAlign: TextVAlign = 'middle';
    public TextHAlign: TextHAlign = 'center';
    public Silent = false;

    constructor(options: ICarouselButtonOptions) {
        const {
            Columns,
            Rows,
            ActionType,
            ActionBody,
            Image,
            Text,
            TextSize,
            TextVAlign,
            TextHAlign,
            Silent
        } = options;

        this.Columns = Columns;
        this.Rows = Rows;
        this.ActionBody = ActionBody;
        this.Image = Image;
        this.Text = Text;
        this.TextSize = TextSize;

        if (Silent !== undefined) {
            this.Silent = Silent;
        }
        if (TextVAlign !== undefined) {
            this.TextVAlign = TextVAlign;
        }
        if (TextHAlign !== undefined) {
            this.TextHAlign = TextHAlign;
        }
        if (ActionType !== undefined) {
            this.ActionType = ActionType;
        }
    }

    public serialize(): ISerializedCarouselButton {
        const obj: ISerializedCarouselButton = {
            ActionType: this.ActionType,
            TextVAlign: this.TextVAlign,
            TextHAlign: this.TextHAlign,
            ActionBody: this.ActionBody,
            Silent: this.Silent
        };

        if (this.Columns !== undefined) {
            obj.Columns = this.Columns;
        }

        if (this.Rows !== undefined) {
            obj.Rows = this.Rows;
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

        return obj;
    }
}

/** Viber Carousel Attachment */
export class Carousel implements ISerializable {
    public ButtonsGroupColumns?: number;
    public ButtonsGroupRows?: number;
    public BgColor?: string;
    public Buttons: CarouselButton[];
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
