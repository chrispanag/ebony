import { Carousel, CarouselButton, Picture } from './attachments';
import { Message } from './message';

const temp = new Message({
    // text: 'bla bla bla',
    sender: {
        name: 'John McClane',
        avatar: 'http://avatar.example.com'
    },
    tracking_data: 'tracking data',
    // attachment: new Picture(
    //     'https://sites.google.com/site/thisisjustatest2294/_/rsrc/1468742544208/project-resources/image-search/google-image-search/Screen%20Shot%202015-11-28%20at%201.14.27%20PM.png',
    //     'https://getuikit.com/v2/docs/images/placeholder_600x400.svg'
    // ).serialize(),
    rich_media: new Carousel('rich_media', 6, 7, '#FFFFFF', [
        new CarouselButton(
            6,
            4,
            'open-url',
            'https://en.wikipedia.org/wiki/Trie',
            'https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
            '<font color=#ffffff>Learn About Tries</font>',
            'medium',
            'middle',
            'left'
        ).serialize(),
        new CarouselButton(
            6,
            4,
            'open-url',
            'https://www.google.com',
            'https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
            '<font color=#ffffff>Learn About Tries</font>',
            'medium',
            'middle',
            'left'
        ).serialize()
    ])
    // ,type: 'rich_media'
}).serialize();

const myJSON = JSON.stringify(temp);
console.log(myJSON);
