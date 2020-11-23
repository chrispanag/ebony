import { createModule, InMemoryUser, Module } from '@ebenos/framework';

import text from './text';
import { preMiddlewares } from './middlewares';

const getStartedModule: Module<InMemoryUser> = createModule('getStarted');
getStartedModule.text = text;
getStartedModule.preMiddlewares = preMiddlewares;

export default getStartedModule;

import './actions';
