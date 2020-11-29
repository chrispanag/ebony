import { bot } from '../../bot';
import { InMemoryUser } from '@ebenos/framework';

const textRules: Array<{ regex: RegExp; action: (user: InMemoryUser) => Promise<void> }> = [
    {
        regex: /.*/,
        action: (user: InMemoryUser): Promise<void> => bot.actions.exec('getStarted', user)
    }
];

export default textRules;
