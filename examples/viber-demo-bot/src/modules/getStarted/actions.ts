import { bot } from '../../bot';
import { Message } from '@ebenos/viber-elements';
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
