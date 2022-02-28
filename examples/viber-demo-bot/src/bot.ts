import { Bot, InMemoryUser } from '@ebenos/framework';
import { ViberAdapter } from '@ebenos/viber-adapter';
import { viberConfig } from './secret';

import getStartedModule from './modules/getStarted';

export const adapter = new ViberAdapter({
    authToken: viberConfig.auth_token
});
export const bot = new Bot<InMemoryUser>(adapter, {});

adapter.webhook.use((req, res, next) => {
    console.log(req.body);
    next();
});

bot.addModule(getStartedModule);
