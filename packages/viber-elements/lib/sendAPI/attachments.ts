/**Viber Carousel Button */
export class CarouselButton {
    public Columns?: number;
    public Rows?: number;
    public ActionType?: string;
    public ActionBody?: string;
    public Image?: string;
    public Text?: string;
    public TextSize?: string;
    public TextVAlign?: string;
    public TextHAlign?: string;

    constructor(
        Columns: number,
        Rows: number,
        ActionType: string,
        ActionBody: string,
        Image: string,
        Text: string,
        TextSize: string,
        TextVAlign: string,
        TextHAlign: string
    ) {
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
export class Carousel {
    public Type: string;
    public ButtonsGroupColumns: number;
    public ButtonsGroupRows: number;
    public BgColor: string;
    public Buttons: CarouselButton[];

    constructor(
        Type: string,
        ButtonsGroupColumns: number,
        ButtonsGroupRows: number,
        BgColor: string,
        Buttons: CarouselButton[]
    ) {
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
        }

        return obj;
    }
}

/** Viber Image Attachment */
export class Picture {
    public media: string;
    public thumbnail: string | null;

    /**
     *
     * @param media - (Required) URL of the image
     * @param thumbnail - URL of a reduced size image
     */
    constructor(media: string, thumbnail: string | null) {
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
