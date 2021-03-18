import { Carousel, CarouselButton, Picture } from './attachments';
import { Keyboard, KeyboardButton } from './keyboard';
import { Message } from './message';

const temp = new Message({
    // text: 'bla bla bla',
    type: 'rich_media',
    sender: {
        name: 'John McClane',
        avatar: 'http://avatar.example.com'
    },
    tracking_data: 'tracking data',
    // attachment: new Picture({
    //     media: 'https://sites.google.com/site/thisisjustatest2294/_/rsrc/1468742544208/project-resources/image-search/google-image-search/Screen%20Shot%202015-11-28%20at%201.14.27%20PM.png',
    //     thumbnail: 'https://getuikit.com/v2/docs/images/placeholder_600x400.svg'
    // }),
    keyboard: new Keyboard({
        DefaultHeight: true,
        BgColor: '#FFFFFF',
        Buttons: [
            new KeyboardButton({
                Columns: 6,
                Rows: 1,
                BgColor: '#2db9b9',
                BgMediaType: 'gif',
                BgMedia: 'http://www.url.by/test.gif',
                BgLoop: true,
                ActionType: 'open-url',
                OpenURLType: 'internal',
                InternalBrowser: {
                    Mode: 'fullscreen',
                    CustomTitle: 'Your Title'
                },
                ActionBody: 'www.tut.by',
                Image: 'www.tut.by/img.jpg',
                Text: 'Key text',
                TextVAlign: 'middle',
                TextHAlign: 'center',
                TextOpacity: 60,
                TextSize: 'regular'
            })
        ]
    }),

    rich_media: new Carousel({
        Type: 'rich_media',
        ButtonsGroupColumns: 6,
        ButtonsGroupRows: 7,
        BgColor: '#FFFFFF',
        Buttons: [
            new CarouselButton({
                Columns: 6,
                Rows: 4,
                ActionType: 'open-url',
                ActionBody: 'https://en.wikipedia.org/wiki/Trie',
                Image:
                    'https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
                Text: '<font color=#ffffff>Learn About Tries</font>',
                TextSize: 'medium',
                TextVAlign: 'middle',
                TextHAlign: 'left'
            }),
            new CarouselButton({
                Columns: 6,
                Rows: 4,
                ActionType: 'open-url',
                ActionBody: 'https://en.wikipedia.org/wiki/Trie',
                Image:
                    'https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
                Text: '<font color=#ffffff>Learn About Tries</font>',
                TextSize: 'medium',
                TextVAlign: 'middle',
                TextHAlign: 'left'
            })
        ]
    })
}).serialize();

const myJSON = JSON.stringify(temp);
console.log(myJSON);
