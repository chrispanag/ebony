import { bot } from '../../bot';
import { Message, TextQuickReply } from '@ebenos/elements';
import {
    addAction,
    addPostbackRule,
    addTextRule,
    createPayload,
    InMemoryUser
} from '@ebenos/framework';
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
        .send(
            new Message({
                text: 'test1'
            })
        )
        .send(
            new Message({
                text: 'test2'
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
                text: `${now.toISOString()}`,
                quickreplies: [
                    new TextQuickReply(
                        'Test Text Payload',
                        createPayload(getStartedModule, getStartedSecond, 'string')
                    ),
                    new TextQuickReply(
                        'Test Object Payload',
                        createPayload(getStartedModule, getStartedSecond, 'object', {
                            data: 'isData'
                        })
                    )
                ]
            })
        )
        .end();
}
