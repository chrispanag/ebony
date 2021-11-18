import { adapter } from './bot';
import { viberConfig } from './secret';

adapter.webhook.listen(3000);
console.log('Listening...');

console.log('Setting up webhook...');

(async () => {
    await adapter.setWebhook(viberConfig.webhook_domain);
    console.log('Ready!');
})();
