import { createModule, InMemoryUser, Module } from '@ebenos/framework';

const getStartedModule: Module<InMemoryUser> = createModule('getStarted');

export default getStartedModule;

import './actions';
