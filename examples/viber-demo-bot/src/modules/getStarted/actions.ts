import { bot } from '../../bot';
import { Carousel, CarouselButton, Message } from '@ebenos/viber-elements';
import { addAction, addTextRule, InMemoryUser } from '@ebenos/framework';
import getStartedModule from '.';

addAction(getStartedModule, getStartedSecond);
addTextRule(getStartedModule, getStartedSecond, /.*/);
async function getStartedSecond(user: InMemoryUser) {
    const now = new Date();
    await bot
        .scenario(user)
        .send(
            new Message({
                text: `${now.toISOString()} Second`,
                sender: {
                    name: 'Christos'
                }
            })
        )
        .end();
}

const testArray = [
    {
        title: 'Test 1',
        picture: 'https://testcreative.co.uk/wp-content/uploads/2018/08/Test-Twitter-Icon.jpg',
        subtitle: 'test 1'
    },
    {
        title: 'Test 1',
        picture: 'https://testcreative.co.uk/wp-content/uploads/2018/08/Test-Twitter-Icon.jpg',
        subtitle: 'test 1'
    },
    {
        title: 'Test 1',
        picture: 'https://testcreative.co.uk/wp-content/uploads/2018/08/Test-Twitter-Icon.jpg',
        subtitle: 'test 1'
    },
    {
        title: 'Test 1',
        picture: 'https://testcreative.co.uk/wp-content/uploads/2018/08/Test-Twitter-Icon.jpg',
        subtitle: 'test 1'
    },
    {
        title: 'Test 1',
        picture: 'https://testcreative.co.uk/wp-content/uploads/2018/08/Test-Twitter-Icon.jpg',
        subtitle: 'test 1'
    },
    {
        title: 'Test 1',
        picture: 'https://testcreative.co.uk/wp-content/uploads/2018/08/Test-Twitter-Icon.jpg',
        subtitle: 'test 1'
    }
];

async function getTest6(user: InMemoryUser) {
    const now = new Date();
    await bot
        .scenario(user)
        .send(
            new Message({
                sender: {
                    name: 'Giorgos'
                },
                rich_media: new Carousel({
                    ButtonsGroupColumns: 6,
                    ButtonsGroupRows: 3,
                    BgColor: '#FFFFFF',
                    Buttons: testArray.map(
                        (obj) =>
                            new CarouselButton({
                                ActionBody: 'test',
                                ActionType: 'none',
                                Columns: 6,
                                Rows: 4,
                                Image: obj.picture,
                                Text: '<font color=#000000>' + obj.title + '</font>',
                                TextSize: 'medium',
                                TextVAlign: 'bottom',
                                TextHAlign: 'center'
                            })
                    )
                })
            })
        )
        .end();
}
