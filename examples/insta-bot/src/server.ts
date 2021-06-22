import { adapter } from './bot';

adapter.webhook.listen(3002);
console.log('Listening...');

console.log('Setting up webhook...');

(async () => {
    console.log('Ready!');
})();
