import { Bot, InMemoryUser, inMemoryUserLoader } from '@ebenos/framework';
import { fbConfig } from './secret';
import { MessengerAdapter } from '@ebenos/messenger-adapter';

import getStarted from './modules/getStarted';
import { story_mention } from './modules/getStarted/actions';

export const adapter = new MessengerAdapter(fbConfig, inMemoryUserLoader());

export const bot = new Bot<InMemoryUser>(adapter, {});

bot.addModule(getStarted);

bot.addStoryMentionRule(story_mention);
