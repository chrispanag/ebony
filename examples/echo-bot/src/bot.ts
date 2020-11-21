import { Bot, TestAdapter, InMemoryUser } from '@ebenos/framework';
import { MessengerAdapter } from '@ebenos/messenger-adapter';
import { connect } from 'mongoose';

// import { fbConfig } from './secret';

// export const adapter = new MessengerAdapter(fbConfig);
export const adapter = new TestAdapter();
export const bot = new Bot<InMemoryUser>(adapter, {});


