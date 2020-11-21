import { bot } from '../../bot';
import { MessengerUser } from '@ebenos/messenger-adapter';
import { InMemoryUser } from '@ebenos/framework';

const textRules: Array<{ regex: RegExp; action: (user: InMemoryUser) => any }> = [
    { regex: /.*/, action: (user: InMemoryUser) => bot.actions.exec('getStarted', user) }
];

export default textRules;
