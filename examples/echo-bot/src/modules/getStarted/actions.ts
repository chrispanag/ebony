import { bot } from '../../bot';
import { MessengerUser } from '@ebenos/messenger-adapter';
import { Message } from '@ebenos/elements';
import { addAction, addPostbackRule } from '@ebenos/framework';
import getStartedModule from '.';

addAction(getStartedModule, getStarted);
addPostbackRule(getStartedModule, getStarted, 'string');
async function getStarted(user: MessengerUser) {
    const now = new Date();
    await bot
        .scenario(user)
        .send(
            new Message({
                text: `${now.toISOString()}`
            })
        )
        .end();
}
