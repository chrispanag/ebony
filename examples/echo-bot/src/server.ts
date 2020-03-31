import { bot } from './bot';

bot.start({
    port: (process.env.PORT as any) || 3000
});
