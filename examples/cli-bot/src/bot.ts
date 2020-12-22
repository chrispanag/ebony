import { Bot, InMemoryUser } from '@ebenos/framework';
import { CliAdapter } from '@ebenos/cli-adapter';

import getStartedModule from './modules/getStarted';

export const adapter = new CliAdapter();
export const bot = new Bot<InMemoryUser>(adapter, {});

bot.addModule(getStartedModule);
