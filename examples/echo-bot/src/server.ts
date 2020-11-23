import express from 'express';
import bodyParser from 'body-parser';
import { adapter, bot } from './bot';

// const app = express();

// app.use('/fb', bodyParser.json());
// app.use('/fb', adapter.webhook);

// app.listen(3000);

console.log(bot.actions);
adapter.inputFunction()('postback', '12345', 'getStarted/getStarted');
