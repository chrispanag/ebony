# Ebony Framework

An easy to use, module-based, multi-channel chatbot framework.

## Features

* Separation in independent, portable, easy to customize modules
* Separate adapters for interfacing with communication channels (Facebook Messenger, Slack, Viber, SMS etc.)
* Dialogue context management system
* Route-based rules, with middlewares
* Uses MongoDB for storing user information

## Getting Started 

For now, there is no detailed documentation for Ebony Framework. You can easily create an ebony-based Facebook Messenger Bot with the [Messenger Bot Template](https://github.com/chrispanag/messenger-bot-template). If you have any questions and/or suggestions feel free to open an issue, or create a pull request.

### Initialize the bot

```typescript
import { Bot } from 'ebony-framework';

// Import the adapter (for example the Messenger Adapter) as well as the user model
import { MessengerAdapter, MessengerUser } from 'ebony-messenger-adapter';

// ... Here import the modules you'll use... 
import botModule from './modules/botModule';

const adapters = [
    // Here you initialize the adapters one by one. 
    // For example the Messenger Adapter:
    new MessengerAdapter({
        pageId: /* Your FB Page ID */,
        pageToken: /* Your Page Token */ ,
        appSecret: /* Your App Secret */,
        webhookKey: /* Your Webhook Key */
    });
];

export const bot = new Bot<MessengerUser>(adapters, {
    mongodbUri: /* Your MongoDB Connection URI */
});

bot.addModule(botModule);

```

### Channel Adapters

For now, only a [Messenger Platform](https://developers.facebook.com/docs/messenger-platform) adapter is publicly available. If you want to use the Ebony Framework for another channel, open an issue to discuss the development of a new adapter.

* [Ebony Messenger Adapter](https://github.com/chrispanag/ebony-messenger-adapter)

## Authors

* [Christos Panagiotakopoulos](https://github.com/chrispanag) - Initial Work 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
