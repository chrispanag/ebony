import { Bot, InMemoryUser, inMemoryUserLoader } from '@ebenos/framework';
import { fbConfig } from './secret';
import { MessengerAdapter } from '@ebenos/messenger-adapter';
import { Message } from '@ebenos/elements';

import getStarted from './modules/getStarted';

const DELAY = 10;

export const adapter = new MessengerAdapter(fbConfig, inMemoryUserLoader());

export const bot = new Bot<InMemoryUser>(adapter, {});

bot.addModule(getStarted);

bot.addStoryMentionRule(story_mention);
bot.addStoryMentionRule(story_mention1);
async function story_mention(user: InMemoryUser) {
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
async function story_mention1(user: InMemoryUser) {
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
