/**
 * ebony-framework
 * 
 * @module bot
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
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

const { sender } = require('ebony-sendapi');

const { webhook } = require('messenger-platform-node');
const webhookFactories = require('./webhooks');

/**
 * @param {Object} actions - The actions object
 * @param {String[]} actionNames - The names of the default actions
 * @returns {Object} - Returns the default actions
 */
function generateDefaultActions(actions, actionNames = []) {
    const defaultActions = {};
    actionNames.forEach(actionName => {
        let newDefaultAction = {};
        newDefaultAction[actionName] = (id, user, ...params) => actions.exec(actionName, id, user, ...params);
        newDefaultAction = Object.assign(defaultActions, newDefaultAction);
    });
    return defaultActions;
}

/**
 * The Bot Class
 */
class Bot {

    /**
     * @typedef {Object} BotOptions
     * @property {Object} handlers
     * @property {Array} defaultActions
     * @property {Function} userLoaderFactory
     * @property {Object} db
     * @property {Object} sendMiddlewares
     */

    /**
     * 
     * Create a Bot 
     * @param {BotOptions} options - The options of the bot
     */
    constructor({ handlers = {}, defaultActions = [], fb = null, userModelFactory = null, db = null, sendMiddlewares = {} }) {
        this.actions = new Actions(sendMiddlewares);

        this.handlers = {};

        this.defaultActions = {};
        if (defaultActions.length > 0)
            this.defaultActions = generateDefaultActions(this.actions, defaultActions);

        if (fb) {
            this.fb = fb;
            this._sender = sender(fb);
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
        this.attachmentRouter = new ContextRouter({ field: '_context.step' });

        if ('yes_noAnswerFactory' in handlers)
            this.yes_noAnswer = handlers.yes_noAnswerFactory(this.messenger, this.sentimentRouter);

        if ('nlpHandlerFactory' in handlers)
            this.complexNlp = handlers.nlpHandlerFactory(this.messenger);

        this.timeoutPromise = timeoutPromise;

        this.app = express();

    }

    /**
     * @typedef {Object} WebhookOptions
     * @property {number} port
     * @property {string} route
     * @property {string} FB_WEBHOOK_KEY
     * @property {string} FB_PAGE_ID
     */

    /**
     * This initiates the webhook and the bot starts listening
     * @param {WebhookOptions} options - The options of the webhook
     * @returns {void}
     */
    start({ port = 3000, route = '/fb', FB_WEBHOOK_KEY = "123", FB_PAGE_ID }) {

        this.app.use(route, bodyParser.json({ verify: this.fb.verifyRequestSignature }));

        // Webhook setup (Verify Token for the webhook)
        this.app.get(route, (req, res) => {
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

        this.app.post('/fb', webhook(FB_PAGE_ID, webhooks));
        this.app.get('/', (req, res) => res.send("Built with <a href=\"https://github.com/chrispanag/ebony\">Ebony Framework</a>"));

        this.app.listen(port);
    }

    /**
     * @returns {function} - Returns an nlpHandler
     */
    nlpHandler() {
        return nlpHandlerFactory(this.intentRouter, this.yes_noAnswer, this.complexNlp);
    }

    /**
     * @returns {function} - Returns a locationHandler
     */
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

    /**
     * @returns {function} - Returns an attachmentHandler
     */
    attachmentHandler() {
        const settings = [
            this.locationHandlerFactory(),
            this.yes_noAnswer,
            this.defaultMessages,
            this.fb,
            this.attachmentRouter
        ];

        return attachmentHandlerFactory(...settings);
    }

    /**
     * @returns {function} - Returns a userLoader
     */
    userLoader() {
        return userLoaderFactory(this.userModelFactory, this.db, this.fb);
    }

    /**
     * @returns {function} - returns a textHandler
     */
    textHandler() {
        return textHandlerFactory(this.textMatcher, this.nlpHandler());
    }

    /**
     * Adds a Module to the chatbot
     * @typedef {Object} Module
     * @property {Object} routes
     * @property {Object} actions
     * @property {Object} referrals
     * @property {Array} text
     * 
     * @param {Module} module - The module to be added
     * @returns {void}
     */
    addModule({ routes = {}, actions = {}, intents = {}, referrals = {}, text = [], attachment = {} }) {
        this.postbackRouter.importRoutes(routes);
        this.actions.importActions(actions);
        this.intentRouter.importRoutes(intents);
        this.referralsRouter.importRoutes(referrals);
        this.textMatcher.importRules(text);
        this.attachmentRouter.importRoutes(attachment);
    }

    // Actions 
    scenario(id) {
        const that = this;
        const scenarios = {
            _actions: [],
            end: async () => {
                for (const action of scenarios._actions) {
                    const properties = action.call.split('.');
                    let obj = that;
                    for (const property of properties) {
                        obj = obj[property];
                    }
                    await obj(...action.params);
                }
                scenarios._actions = [];
            },
            send: (message, options = {}) => {
                scenarios._actions.push({
                    call: '_sender',
                    params: [
                        id,
                        message,
                        options
                    ]
                });
                return scenarios;
            },
            wait: millis => {
                scenarios._actions.push({
                    call: 'timeoutPromise',
                    params: [millis]
                });
                return scenarios;
            },
            types: () => {
                scenarios._actions.push({
                    call: 'fb.startsTyping',
                    params: [id]
                });
                return scenarios;
            },
            typeAndWait: millis => {
                scenarios.types();
                scenarios.wait(millis);
                return scenarios;
            }
        };
        return scenarios;
    }
}

module.exports = Bot;

function timeoutPromise(millis) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), millis);
    });
}
