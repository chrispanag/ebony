import { Bot, TestAdapter, InMemoryUser } from '@ebenos/framework';

// import { fbConfig } from './secret';

// export const adapter = new MessengerAdapter(fbConfig);
export const adapter = new TestAdapter();
export const bot = new Bot<InMemoryUser>(adapter, {});

import getStartedModule from './modules/getStarted';
bot.addModule(getStartedModule);
