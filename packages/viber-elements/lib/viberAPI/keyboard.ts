import { ISerializable } from '@ebenos/framework';
import { Button } from './attachments';
import { IKeyboardOptions, InputFieldState, ISerializedKeyboard } from './interfaces';

/** Viber Keyboard */
export class Keyboard implements ISerializable {
    public Buttons: Button[];
    public BgColor?: string;
    public DefaultHeight = false;
    public CustomDefaultHeight?: number;
    public ButtonsGroupColumns = 6;
    public ButtonsGroupRows = 2;
    public InputFieldState: InputFieldState = 'regular';
    public FavoritesMetadata?: string;

    constructor(options: IKeyboardOptions) {
        const {
            Buttons,
            BgColor,
            DefaultHeight,
            CustomDefaultHeight,
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
        if (DefaultHeight !== undefined) {
            this.DefaultHeight = DefaultHeight;
        }
        if (InputFieldState !== undefined) {
            this.InputFieldState = InputFieldState;
        }
    }

    public serialize(): ISerializedKeyboard {
        const obj: ISerializedKeyboard = {
            Buttons: this.Buttons.map((b) => b.serialize()),
            InputFieldState: this.InputFieldState,
            DefaultHeight: this.DefaultHeight,
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
