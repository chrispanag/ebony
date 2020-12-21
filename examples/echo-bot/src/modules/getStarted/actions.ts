import { bot } from '../../bot';
import { Message } from '@ebenos/elements';
import { addAction, addPostbackRule, addTextRule, InMemoryUser } from '@ebenos/framework';
import getStartedModule from '.';

addAction(getStartedModule, getStartedSecond);
addTextRule(getStartedModule, getStartedSecond, /SECOND/);
async function getStartedSecond(user: InMemoryUser) {
    const now = new Date();
    await bot
        .scenario(user)
        .send(
            new Message({
                text: `${now.toISOString()} Second`
            })
        )
        .end();
}

addAction(getStartedModule, getStarted);
addPostbackRule(getStartedModule, getStarted, 'string');
addTextRule(getStartedModule, getStarted, /.*/);
async function getStarted(user: InMemoryUser) {
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
