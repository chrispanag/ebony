/**
 * ebony-framework
 * 
 * @module bot
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 */

import express from 'express';
import bodyParser from 'body-parser';

import User from './models/User';

import attachmentHandlerFactory from './handlers/attachment';
import userLoader from './handlers/userLoader';
import textHandlerFactory from './handlers/text';
import nlpHandlerFactory from './handlers/nlp';

// Router Classes
import PostbackRouter from './routers/PostbackRouter';
import ContextRouter from './routers/ContextRouter';
import ReferralsRouter from './routers/ReferralsRouter';
import IntentRouter from './routers/IntentRouter';

import Actions from './utilities/actions';
import TextMatcher from './utilities/TextMatcher';
import { sender } from 'ebony-sendapi';

const { webhook } = require('messenger-platform-node');
const webhookFactories = require('./webhooks');

/**
 * @param {Object} actions - The actions object
 * @param {String[]} actionNames - The names of the default actions
 * @returns {Object} - Returns the default actions
 */
function generateDefaultActions(actions: { [key: string]: any }, actionNames: string[] = []) {
    const defaultActions: any = {};
    actionNames.forEach((actionName: string) => {
        let newDefaultAction: any = {};
        newDefaultAction[actionName] = (id: string, user: User, ...params: any) => actions.exec(actionName, id, user, ...params);
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

    private actions: Actions;
    private handlers: any;
    private defaultActions: any;
    private fb: any; // Need to remove dat
    private _sender: any;
    public userLoader: any;

    private postbackRouter: PostbackRouter;
    private locationRouter: ContextRouter;
    private referralsRouter: ReferralsRouter;
    private intentRouter: IntentRouter;
    private textMatcher: TextMatcher;
    private sentimentRouter: ContextRouter;
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

        this.userLoader = userLoader;

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

        this.timeoutPromise = timeoutPromise;
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
    start({ port = 3000, route = '/fb', FB_WEBHOOK_KEY = "123", FB_PAGE_ID = "" }) {
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
        app.get('/', (req, res) => res.send("Built with <a href=\"https://github.com/chrispanag/ebony\">Ebony Framework</a>"));

        app.listen(port);
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

        return (user: User, coordinates: any) => {
            const res = locationRouter.getContextRoute(user, coordinates);

            if (!res)
                return locationFallback(user, coordinates);

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
            this.fb
        ];

        return attachmentHandlerFactory(...settings);
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
    addModule({ routes = {}, actions = {}, intents = {}, referrals = {}, text = [] }) {
        this.postbackRouter.importRoutes(routes);
        this.actions.importActions(actions);
        this.intentRouter.importRoutes(intents);
        this.referralsRouter.importRoutes(referrals);
        this.textMatcher.importRules(text);
    }

    // Actions 
    scenario(id: string) {
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
            wait: (millis: number) => {
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
            typeAndWait: (millis: number) => {
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
