import { bot } from '../../bot';
import { MessengerUser } from '@ebenos/messenger-adapter';
import sendAPI from '@ebenos/elements';

const { Message } = sendAPI;

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
