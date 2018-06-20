/**
 * ebony-framework
 * 
 * @module bot
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

const express = require('express');
const bodyParser = require('body-parser');

const defaultUserModel = require('./models/user');

function defaultUserModelFactory(db, fb) {
    return defaultUserModel(db, fb)
}

const attachmentHandlerFactory = require('./handlers/attachment');
const userLoaderFactory = require('./handlers/userLoader');
const textHandlerFactory = require('./handlers/text');
const nlpHandlerFactory = require('./handlers/nlp');

// Router Classes
const PostbackRouter = require('./routers/PostbackRouter');
const ContextRouter = require('./routers/ContextRouter');
const ReferralsRouter = require('./routers/ReferralsRouter');
const IntentRouter = require('./routers/IntentRouter');

const Actions = require('./utilities/actions');

const TextMatcher = require('./utilities/TextMatcher');

const { sender } = require('./sendAPI');

const { webhook } = require('messenger-platform-node');
const webhookFactories = require('./webhooks');

function generateDefaultActions(actions, actionNames = []) {
    const defaultActions = {};
    actionNames.forEach(actionName => {
        let newDefaultAction = {};
        newDefaultAction[actionName] = (id, user, ...params) => actions.exec(actionName, id, user, ...params);
        newDefaultAction = Object.assign(defaultActions, newDefaultAction);
    });
    return defaultActions;
}

class Bot {
    constructor({ handlers = {}, defaultActions = [], fb = null, userModelFactory = null, db = null, sendMiddlewares = {} }) {
        this.actions = new Actions(sendMiddlewares);

        this.handlers = {};

        this.defaultActions = {};
        if (defaultActions.length > 0)
            this.defaultActions = generateDefaultActions(this.actions, defaultActions);

        if (fb) {
            this.fb = fb;
            this.send = sender(fb);
        }

        this.userModelFactory = defaultUserModelFactory;
        if (userModelFactory)
            this.userModelFactory = userModelFactory;

        if (db)
            this.db = db;

        // Create routers
        this.postbackRouter = new PostbackRouter();
        this.locationRouter = new ContextRouter({ field: '_context.step' });
        this.referralsRouter = new ReferralsRouter();
        this.intentRouter = new IntentRouter();
        this.textMatcher = new TextMatcher();
        this.sentimentRouter = new ContextRouter({ field: '_context.step' });

        if ('yes_noAnswerFactory' in handlers)
            this.yes_noAnswer = handlers.yes_noAnswerFactory(this.messenger, this.sentimentRouter);

        if ('nlpHandlerFactory' in handlers)
            this.complexNlp = handlers.nlpHandlerFactory(this.messenger);
    }

    start({ port = 3000, route = '/fb', FB_WEBHOOK_KEY = "123", FB_PAGE_ID }) {
        const app = express();
        app.use(bodyParser.json({ verify: this.fb.verifyRequestSignature }));

        // Webhook setup (Verify Token for the webhook)
        app.get(route, (req, res) => {
            if (req.query['hub.mode'] === 'subscribe' &&
                req.query['hub.verify_token'] === FB_WEBHOOK_KEY) {
                console.log("Validating webhook");
                res.status(200).send(req.query['hub.challenge']);
            } else {
                console.error("Failed validation. Make sure the validation tokens match.");
                res.sendStatus(400);
            }
        });

        const handlers = {
            // Main Handlers
            attachmentHandler: this.attachmentHandler({}),
            textHandler: this.textHandler(),
            // Routes
            referralsRouter: this.referralsRouter,
            postbackRouter: this.postbackRouter,
            // Context
            getContext: this.userLoader(),
        }

        const { messagingWebhook } = webhookFactories;
        const webhooks = {
            messages: messagingWebhook(handlers)
        }

        app.post('/fb', webhook(FB_PAGE_ID, webhooks));

        app.listen(port);
    }

    nlpHandler() {
        return nlpHandlerFactory(this.intentRouter, this.yes_noAnswer, this.complexNlp);
    }

    locationHandlerFactory() {
        const locationRouter = this.locationRouter;
        const locationFallback = this.defaultActions.locationFallback;

        return (id, user, coordinates) => {
            const res = locationRouter.getContextRoute(id, user, coordinates);

            if (!res)
                return locationFallback(id, user, coordinates);

            return res;
        }

    }

    attachmentHandler() {
        const settings = [
            this.locationHandlerFactory(),
            this.yes_noAnswer,
            this.defaultMessages,
            this.fb
        ];

        return attachmentHandlerFactory(...settings);
    }

    userLoader() {
        return userLoaderFactory(this.userModelFactory, this.db, this.fb);
    }

    textHandler() {
        return textHandlerFactory(this.textMatcher, this.nlpHandler());
    }

    addModule({ routes = {}, actions = {}, intents = {}, referrals = {}, text = [] }) {
        this.postbackRouter.importRoutes(routes);
        this.actions.importActions(actions);
        this.intentRouter.importRoutes(intents);
        this.referralsRouter.importRoutes(referrals);
        this.textMatcher.importRules(text);
    }
}

module.exports = Bot;
