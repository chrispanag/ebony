import { adapter, bot } from './bot';

console.log(bot.actions);
adapter.inputFunction()('postback', '12345', 'getStarted/getStarted');
adapter.inputFunction()('message', '12345', { text: 'test test test' });
adapter.inputFunction()('message', '12345', { text: 'second' });
