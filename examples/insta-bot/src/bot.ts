import { Bot, InMemoryUser, inMemoryUserLoader } from '@ebenos/framework';
import { fbConfig } from './secret';
import { MessengerAdapter } from '@ebenos/messenger-adapter';

import getStarted from './modules/getStarted';

export const adapter = new MessengerAdapter(fbConfig, inMemoryUserLoader());

export const bot = new Bot<InMemoryUser>(adapter, {});

bot.addModule(getStarted);
