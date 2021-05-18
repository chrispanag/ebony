import { Button, RichMedia } from './attachments';
import { IFrame, IRichMediaOptions } from './interfaces';
import { ISerializable } from '@ebenos/framework';

export interface ICarouselElement {
    title?: string;
    image?: string;
    subtitle?: string;
    buttons: Array<{ text: string; url: string } | { text: string; payload: string }>;
}

interface ICarouselElementStyle {
    textColor: string;
    backgroundColor: string;
}

type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export interface ICarouselStyle {
    button: ICarouselElementStyle;
    title: ICarouselElementStyle;
    subtitle: ICarouselElementStyle;
    imageBackgroundColor: string;
    backgroundColor: string;
}
export interface ICarouselOptions {
    style?: DeepPartial<ICarouselStyle>;
    frame?: IFrame;
}

function createCarousel(
    elements: ICarouselElement[],
    options?: ICarouselOptions
): IRichMediaOptions {
    const color = (k: keyof ICarouselStyle, t?: keyof ICarouselElementStyle) => {
        const defaultStyle: ICarouselStyle = {
            title: {
                textColor: '#ffffff',
                backgroundColor: '#ffffff'
            },
            button: {
                textColor: '#ffffff',
                backgroundColor: '#2db9b9'
            },
            subtitle: {
                backgroundColor: '#ffffff',
                textColor: '#696969'
            },
            backgroundColor: '#ffffff',
            imageBackgroundColor: '#ffffff'
        };

        if (k === 'imageBackgroundColor' || k === 'backgroundColor') {
            return options?.style ? options.style[k] : defaultStyle[k];
        }

        if (t === undefined) {
            throw new Error('Need to identify subproperty');
        }

        const element = options?.style ? options.style[k] : defaultStyle[k];
        if (element === undefined) {
            throw new Error('Non-existant element');
        }

        const style = element[t];

        return style ? style : defaultStyle[k][t];
    };

    const frame = options?.frame ? options.frame : undefined;

    let hasSubtitle = false,
        hasTitle = false,
        hasImage = false,
        largerButtons = 0;
    for (const e of elements) {
        if (e.subtitle !== undefined) {
            hasSubtitle = true;
        }

        if (e.title !== undefined) {
            hasTitle = true;
        }

        if (e.image !== undefined) {
            hasImage = true;
        }

        if (largerButtons < e.buttons.length) {
            largerButtons = e.buttons.length;
        }
    }

    const maxRows = largerButtons + (hasSubtitle ? 1 : 0) + (hasTitle ? 1 : 0) + (hasImage ? 3 : 0);
    const buttonsArray = elements.map((e) => [
        ...(hasImage
            ? [
                  new Button({
                      Rows: 3,
                      BgColor: color('imageBackgroundColor'),
                      Columns: 6,
                      Image: e.image,
                      ActionType: 'none',
                      ActionBody: ''
                  })
              ]
            : []),
        ...(hasTitle
            ? [
                  new Button({
                      Rows: 1,
                      Columns: 6,
                      BgColor: color('title', 'backgroundColor'),
                      Text: `<b><font color="${color('title', 'textColor')}">${e.title}</font></b>`,
                      ActionType: 'none',
                      ActionBody: ''
                  })
              ]
            : []),
        ...(hasSubtitle
            ? [
                  new Button({
                      Rows: 1,
                      Columns: 6,
                      BgColor: color('subtitle', 'backgroundColor'),
                      Text: `<font color="${color('subtitle', 'textColor')}">${
                          e.subtitle ? e.subtitle : ''
                      }</font>`,
                      ActionType: 'none',
                      TextSize: 'small',
                      TextHAlign: 'left',
                      ActionBody: ''
                  })
              ]
            : []),
        ...e.buttons.map(
            (button) =>
                new Button({
                    Rows: 1,
                    Columns: 6,
                    Text: `<font color="${color('button', 'textColor')}"><b>${
                        button.text
                    }</b></font>`,
                    BgColor: color('button', 'backgroundColor'),
                    ActionType: 'url' in button ? 'open-url' : 'reply',
                    Silent: 'url' in button,
                    ActionBody: 'url' in button ? button.url : button.payload,
                    Frame: frame
                })
        )
    ]);
    return {
        ButtonsGroupColumns: 6,
        ButtonsGroupRows: maxRows,
        BgColor: color('backgroundColor'),
        Buttons: buttonsArray.flat()
    };
}

export class Carousel extends RichMedia implements ISerializable {
    constructor(elements: ICarouselElement[], options?: ICarouselOptions) {
        super(createCarousel(elements, options));
    }
}
