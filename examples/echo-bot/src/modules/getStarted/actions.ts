import { bot } from '../../bot';
import { MessengerUser } from '@ebenos/messenger-adapter';
import { Message } from '@ebenos/elements';

export async function getStarted(user: MessengerUser) {
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
