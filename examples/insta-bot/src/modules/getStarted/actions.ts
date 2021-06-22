import { bot } from '../../bot';
import { Message } from '@ebenos/elements';
import { addAction, addTextRule, InMemoryUser } from '@ebenos/framework';
import getStartedModule from '.';

const DELAY = 10;

addAction(getStartedModule, getStarted);
addTextRule(getStartedModule, getStarted, /TESTINSTA/);
async function getStarted(user: InMemoryUser) {
    return bot
        .scenario(user)
        .send(
            new Message({
                text: `Hi there!!! 😄`
            })
        )
        .wait(DELAY)
        .send(
            new Message({
                text: 'Now I am on instagram too.'
            })
        )
        .end();
}
