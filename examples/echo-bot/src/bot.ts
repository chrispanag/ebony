import { Bot } from '@ebenos/framework';
import { MessengerAdapter, MessengerUser } from '@ebenos/messenger-adapter';

import { fbConfig, mongodbUri } from './secret';
import getStarted from './modules/getStarted';

export const adapter = new MessengerAdapter(fbConfig);

export const bot = new Bot<MessengerUser>(adapter, {
    mongodbUri
});
