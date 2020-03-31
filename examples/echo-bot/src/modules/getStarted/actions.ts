import { bot } from '../../bot';
import { sendAPI, MessengerUser } from '@ebenos/messenger-adapter';

const { Message } = sendAPI;

export async function getStarted(user: MessengerUser) {
    const now = new Date();
    await bot.scenario(user)
        .send(new Message({
            text: `${now.toISOString()}`
        }))
        .end();
}