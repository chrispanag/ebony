import { Bot, TestAdapter, InMemoryUser } from '@ebenos/framework';

// import { fbConfig } from './secret';

import getStartedModule from './modules/getStarted';

// export const adapter = new MessengerAdapter(fbConfig);
export const adapter = new TestAdapter();
export const bot = new Bot<InMemoryUser>(adapter, {});

bot.addModule(getStartedModule);
