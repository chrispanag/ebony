# Ebony Framework

[![npm](https://img.shields.io/npm/v/@ebenos/framework)](https://www.npmjs.com/package/@ebenos/framework)
![Node CI](https://github.com/chrispanag/ebony/workflows/Node%20CI/badge.svg)

An easy to use, module-based, multi-channel chatbot framework.

## Features

* Separation in independent, portable, easy to customize [modules](docs/modules.md)
* Separate adapters for interfacing with communication channels (Facebook Messenger, Slack, Viber, SMS etc.)
* Dialogue context management system
* Route-based rules, with middlewares
* Uses MongoDB for storing user information

## Getting Started

For now, there is no detailed documentation for Ebony Framework. You can easily create an ebony-based Facebook Messenger Bot with the [Messenger Bot Template](https://github.com/chrispanag/messenger-bot-template). If you have any questions and/or suggestions feel free to open an issue, or create a pull request.

### Prerequisites

You'll need to have NodeJS/NPM on your system, as well as Typescript installed either in your `node_modules` folder or globally in your system.

### Install Ebony Framework

```
$ npm i @ebenos/framework
```

### Install an adapter

(For now only a Messenger Platform adapter is available)

```
$ npm i @ebenos/framework
```

### Initialize the bot

```typescript
import { Bot } from '@ebenos/framework';

// Import the adapter (for example the Messenger Adapter) as well as the user model
import { MessengerAdapter, MessengerUser } from '@ebenos/messenger-adapter';

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

bot.start({
    port: 3000 // You can substitute "3000" with the PORT of your choice.
});
```

### Channel Adapters

For now, only a [Messenger Platform](https://developers.facebook.com/docs/messenger-platform) adapter is publicly available. If you want to use the Ebony Framework for another channel, open an issue to discuss the development of a new adapter.

### Modules

A module is a portable collection of actions, rules and middlewares that is imported into the chatbot on runtime.

See [Modules.md](docs/modules.md) for more information.

#### Action

An action is a function that when triggered, sends a message to the user.

#### Rules

There are multiple types of rules inside a module. A rule could be context based (ContextRouter), postback based (PostbackRouter) or even a regex (TextMatcher). These rules, work similarly to routes in a web framework. They point to an action that is triggered when the rule is satisfied.

#### Middlewares

Middlewares run before (preMiddlewares) and after (postMiddlewares) an action is triggered.

## Next Steps

* Monorepo for all related repositories
* Use redis for user context storing
* Decouple database logic from framework (add support for multiple databases)
* Create Slack Adapter
* Add support for multiple adapters per bot (Allow the same bot to answer through many channels)
* Refine the User model, support true extendable user models
* Add tests

## Authors

* [Christos Panagiotakopoulos](https://github.com/chrispanag) - Initial Work

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
