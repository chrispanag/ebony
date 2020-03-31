import { bot } from '../../bot';
import { MessengerUser } from '@ebenos/messenger-adapter';

const textRules: Array<{ regex: RegExp, action: (user: MessengerUser) => any }> = [
    { regex: /.*/, action: (user: MessengerUser) => bot.actions.exec('getStarted', user) }
];

export default textRules;