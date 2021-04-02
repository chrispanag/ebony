import { bot } from '../../bot';
import { Carousel, Button, Message } from '@ebenos/viber-elements';
import { addAction, addTextRule, InMemoryUser } from '@ebenos/framework';
import getStartedModule from '.';

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

addAction(getStartedModule, getTest6);
addTextRule(getStartedModule, getTest6, /TEST6/);
async function getTest6(user: InMemoryUser) {
    await bot
        .scenario(user)
        .send(
            new Message({
                sender: {
                    name: 'Giorgos'
                },
                rich_media: new Carousel({
                    ButtonsGroupColumns: 2,
                    ButtonsGroupRows: 1,
                    BgColor: '#FFFFFF',
                    Buttons: testArray.map(
                        (obj) =>
                            new Button({
                                ActionBody: 'test',
                                ActionType: 'none',
                                Columns: 2,
                                Rows: 1,
                                Text: '<font color=#0000FF>' + obj.title + '</font>',
                                TextSize: 'regular',
                                TextVAlign: 'middle',
                                TextHAlign: 'center'
                            })
                    )
                })
            })
        )
        .end();
}

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
