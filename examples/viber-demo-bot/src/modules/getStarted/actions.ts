import { bot } from '../../bot';
import { RichMedia, Button, Message } from '@ebenos/viber-elements';
import { Carousel } from '@ebenos/viber-elements';
import { addAction, addPostbackRule, addTextRule, InMemoryUser } from '@ebenos/framework';
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
                rich_media: new RichMedia({
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

const staticButtons = [
    {
        title: '❓ Δεν μπορώ να συνδεθώ στον λογαριασμό μου.',
        subtitle: 'Προβλήματα σύνδεσης στο νέο Pamestoixima.gr.',
        buttons: [
            {
                text: 'ΠΕΡΙΣΣΟΤΕΡΑ...',
                payload: 'faq_account'
            }
        ]
    },
    {
        title: '❓ Δεν μπορώ να δω το ιστορικό συναλλαγών/στοιχημάτων.',
        subtitle: 'Τοποθετημένα στοιχήματα, παλιά στοιχήματα και συναλλαγές.',
        buttons: [
            {
                text: 'ΠΕΡΙΣΣΟΤΕΡΑ...',
                payload: 'faq_history'
            }
        ]
    },
    {
        title: '❓ Έχω πρόβλημα με το site.',
        subtitle: 'Δεν ανοίγει ή δεν μπορώ να μπω καθόλου στο site του νέου Pamestoixima.gr',
        buttons: [
            {
                text: 'ΠΕΡΙΣΣΟΤΕΡΑ...',
                payload: 'technical'
            }
        ]
    }
];

addAction(getStartedModule, getTest7);
addTextRule(getStartedModule, getTest7, /TEST7/);
async function getTest7(user: InMemoryUser) {
    await bot
        .scenario(user)
        .send(
            new Message({
                sender: {
                    name: 'Giorgos'
                },
                rich_media: new Carousel(staticButtons)
            })
        )
        .end();
}

addAction(getStartedModule, getTest8);
addTextRule(getStartedModule, getTest8, /TEST9/);
async function getTest8(user: InMemoryUser) {
    await bot
        .scenario(user)
        .send(
            new Message({
                sender: {
                    name: 'Giorgos'
                },
                media: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif'
            })
        )
        .end();
}

addAction(getStartedModule, test_tracking);
addPostbackRule(getStartedModule, test_tracking, 'object');
async function test_tracking(user: InMemoryUser, payload: { tracking_data: any; text: string }) {
    console.log(payload.text);
    console.log(payload.tracking_data);
    await bot
        .scenario(user)
        .send(
            new Message({
                sender: {
                    name: 'Giorgos'
                },
                text: 'Yes, I got the tracking data: ' + payload.tracking_data.age
            })
        )
        .end();
}

addAction(getStartedModule, getTest11);
addTextRule(getStartedModule, getTest11, /TEST11/);
async function getTest11(user: InMemoryUser) {
    await bot
        .scenario(user)
        .send(
            new Message({
                sender: {
                    name: 'Giorgos'
                },
                text: 'send something with tracking data',
                tracking_data: {
                    type: 'getStarted/test_tracking',
                    isPostback: true,
                    age: 18
                }
            })
        )
        .end();
}

addAction(getStartedModule, getTest12);
addTextRule(getStartedModule, getTest12, /TEST12/);
async function getTest12(user: InMemoryUser) {
    await bot
        .scenario(user)
        .send(
            new Message({
                sender: {
                    name: 'Giorgos'
                },
                text: 'send something with tracking data',
                tracking_data: {
                    age: 18
                }
            })
        )
        .end();
}
