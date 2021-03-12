/**Viber Carousel Button */
export class CarouselButton {
    public Columns: number | null;
    public Rows: number | null;
    public ActionType: string | null;
    public ActionBody: string | null;
    public Image: string | null;
    public Text: string | null;
    public TextSize: string | null;
    public TextVAlign: string | null;
    public TextHAlign: string | null;

    constructor(
        Columns: number | null,
        Rows: number | null,
        ActionType: string | null,
        ActionBody: string | null,
        Image: string | null,
        Text: string | null,
        TextSize: string | null,
        TextVAlign: string | null,
        TextHAlign: string | null
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

        if (this.Columns) {
            obj.Columns = this.Columns;
        }

        if (this.Rows) {
            obj.Rows = this.Rows;
        }

        if (this.ActionType) {
            obj.ActionType = this.ActionType;
        }

        if (this.ActionBody) {
            obj.ActionBody = this.ActionBody;
        }

        if (this.Image) {
            obj.Image = this.Image;
        }

        if (this.Text) {
            obj.Text = this.Text;
        }

        if (this.TextSize) {
            obj.TextSize = this.TextSize;
        }

        if (this.TextVAlign) {
            obj.TextVAlign = this.TextVAlign;
        }

        if (this.TextHAlign) {
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

        if (this.Type) {
            obj.Type = this.Type;
        }

        if (this.ButtonsGroupColumns) {
            obj.ButtonsGroupColumns = this.ButtonsGroupColumns;
        }

        if (this.ButtonsGroupRows) {
            obj.ButtonsGroupRows = this.ButtonsGroupRows;
        }

        if (this.BgColor) {
            obj.BgColor = this.BgColor;
        }

        if (this.Buttons) {
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
        }

        if (this.media) {
            obj.media = this.media;
        }

        if (this.thumbnail) {
            obj.thumbnail = this.thumbnail;
        }

        return obj;
    }
}
