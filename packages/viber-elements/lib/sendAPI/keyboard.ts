interface InternalBrowser {
    ActionButton?: string;
    ActionPredefinedURL?: string;
    TitleType?: string;
    CustomTitle?: string;
    Mode?: string;
    FooterType?: string;
    ActionReplyData?: string;
}

interface Map {
    Latitude?: string;
    Longitude?: string;
}

interface Frame {
    BorderWidth?: number;
    BorderColor?: string;
    CornerRadius?: number;
}

interface MediaPlayer {
    Title?: string;
    Subtitle?: string;
    ThumbnailURL?: string;
    Loop?: boolean;
}

/** Viber Keyboard Button */
export class KeyboardButton {
    public Columns?: number;
    public Rows?: number;
    public BgColor?: string;
    public Silent?: boolean;
    public BgMediaType?: string;
    public BgMedia?: string;
    public BgMediaScaleType?: string;
    public ImageScaleType?: string;
    public BgLoop?: boolean;
    public ActionType?: string;
    public ActionBody?: string;
    public Image?: string;
    public Text?: string;
    public TextVAlign?: string;
    public TextHAlign?: string;
    public TextPaddings?: number[];
    public TextOpacity?: number;
    public TextSize?: string;
    public OpenURLType?: string;
    public TextBgGradientColor?: string;
    public TextShouldFit?: boolean;
    public InternalBrowser?: InternalBrowser;
    public Map?: Map;
    public Frame?: Frame;
    public MediaPlayer?: MediaPlayer;

    constructor(
        Columns?: number,
        Rows?: number,
        BgColor?: string,
        Silent?: boolean,
        BgMediaType?: string,
        BgMedia?: string,
        BgMediaScaleType?: string,
        ImageScaleType?: string,
        BgLoop?: boolean,
        ActionType?: string,
        ActionBody?: string,
        Image?: string,
        Text?: string,
        TextVAlign?: string,
        TextHAlign?: string,
        TextPaddings?: number[],
        TextOpacity?: number,
        TextSize?: string,
        OpenURLType?: string,
        TextBgGradientColor?: string,
        TextShouldFit?: boolean,
        InternalBrowser?: InternalBrowser,
        Map?: Map,
        Frame?: Frame,
        MediaPlayer?: MediaPlayer
    ) {
        this.Columns = Columns;
        this.Rows = Rows;
        this.BgColor = BgColor;
        this.Silent = Silent;
        this.BgMediaType = BgMediaType;
        this.BgMedia = BgMedia;
        this.BgMediaScaleType = BgMediaScaleType;
        this.ImageScaleType = ImageScaleType;
        this.BgLoop = BgLoop;
        this.ActionType = ActionType;
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

    public serialize() {
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
            throw new Error('Actionbody for Keyboard Button is required!');
        } else if (this.ActionBody !== undefined) {
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
export class Keyboard {
    public Buttons: KeyboardButton[];
    public BgColor: string;
    public DefaultHeight: boolean;
    public CustomDefaultHeight: number;
    public HeightScale: number;
    public ButtonsGroupColumns: number;
    public ButtonsGroupRows: number;
    public InputFieldState: string;
    public FavoritesMetadata: JSON;

    constructor(
        Buttons: KeyboardButton[],
        BgColor: string,
        DefaultHeight: boolean,
        CustomDefaultHeight: number,
        HeightScale: number,
        ButtonsGroupColumns: number,
        ButtonsGroupRows: number,
        InputFieldState: string,
        FavoritesMetadata: JSON
    ) {
        (this.Buttons = Buttons),
            (this.BgColor = BgColor),
            (this.DefaultHeight = DefaultHeight),
            (this.CustomDefaultHeight = CustomDefaultHeight),
            (this.HeightScale = HeightScale),
            (this.ButtonsGroupColumns = ButtonsGroupColumns),
            (this.ButtonsGroupRows = ButtonsGroupRows),
            (this.InputFieldState = InputFieldState),
            (this.FavoritesMetadata = FavoritesMetadata);
    }

    public serialize() {
        const obj: any = {};

        if (!this.Buttons) {
            throw new Error('Buttons field is required for keyboard!');
        } else {
            obj.Buttons = this.Buttons;
        }

        if (this.BgColor !== undefined) {
            obj.BgColor = this.BgColor;
        }

        if (this.DefaultHeight !== undefined) {
            obj.DefaultHeight = this.DefaultHeight;
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

        if (this.InputFieldState !== undefined) {
            obj.InputFieldState = this.InputFieldState;
        }

        if (this.FavoritesMetadata !== undefined) {
            obj.FavoritesMetadata = this.FavoritesMetadata;
        }

        return obj;
    }
}
