# Ebony Framework

[![npm](https://img.shields.io/npm/v/@ebenos/framework)](https://www.npmjs.com/package/@ebenos/framework)
![Node CI](https://github.com/chrispanag/ebony/workflows/Node%20CI/badge.svg)

An easy to use, module-based, multi-channel chatbot framework.

## Features

-   Separation in independent, portable, easy to customize [modules](docs/modules.md)
-   Separate adapters for interfacing with communication channels (For now Facebook Messenger and Viber)
-   Route-based rules, with middlewares

## Getting Started

For now, there is no detailed documentation for Ebony Framework. You can easily create an ebony-based Facebook Messenger Bot with the [Messenger Bot Template](https://github.com/chrispanag/messenger-bot-template). If you have any questions and/or suggestions feel free to open an issue, or create a pull request.

### Install Ebony Framework

```
$ yarn add @ebenos/framework
```

### Install an adapter

For Messenger:

```
$ yarn add @ebenos/messenger-adapter
```

For Viber:

```
$ yarn add @ebenos/viber-adapter
```

### Initialize the bot

```typescript
import { Bot } from '@ebenos/framework';

// Import the adapter (for example the Messenger Adapter) as well as the user model
import { MessengerAdapter, MessengerUser } from '@ebenos/messenger-adapter';

// ... Here import the modules you'll use...
import botModule from './modules/botModule';

// Here you initialize the adapter.
// For example the Messenger Adapter:
const adapter =
    new MessengerAdapter({
        pageId: /* Your FB Page ID */,
        pageToken: /* Your Page Token */ ,
        appSecret: /* Your App Secret */,
        webhookKey: /* Your Webhook Key */
    });

export const bot = new Bot<MessengerUser>(adapter, {
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

An action is a function that when it's triggered, it sends a message to the user.

#### Rules

There are multiple types of rules inside a module. A rule could be context based (ContextRouter), postback based (PostbackRouter) or even a regex (TextMatcher). These rules, work similarly to routes in a web framework. They point to an action that is triggered when the rule is satisfied.

#### Middlewares

Middlewares run before (preMiddlewares) and after (postMiddlewares) an action is triggered.

## Development/Contributing

How to set up the ebony repository:

1. `yarn install`
2. `yarn lerna bootstrap`
3. `yarn lerna run build`

### Linting

`yarn lerna run lint`

## Next Steps

-   Add tests
-   Decouple database logic from framework (add support for multiple databases)
-   Use redis for user context storing
-   Create Slack adapter

## Authors

-   [Christos Panagiotakopoulos](https://github.com/chrispanag) - Initial Work

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
