import { createModule, InMemoryUser, Module } from '@ebenos/framework';
import { MessengerUser } from '@ebenos/messenger-adapter';

import text from './text';
import { preMiddlewares } from './middlewares';
import { bot } from '../../bot';

const getStartedModule: Module<InMemoryUser> = createModule('getStarted', bot);
getStartedModule.text = text;
getStartedModule.preMiddlewares = preMiddlewares;

bot.addModule(getStartedModule);
export default getStartedModule;
