/**
 * ebony-framework
 * 
 * @module bot
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 */

import express from 'express';
import GenericAdapter from './adapter';

import User from './models/User';

import attachmentHandlerFactory from './handlers/attachment';
import textHandlerFactory from './handlers/text';
import nlpHandlerFactory from './handlers/nlp';

// Router Classes
import PostbackRouter from './routers/PostbackRouter';
import ContextRouter from './routers/ContextRouter';
import ReferralsRouter from './routers/ReferralsRouter';
import IntentRouter from './routers/IntentRouter';

import Actions from './utilities/actions';
import TextMatcher from './utilities/TextMatcher';
import bodyParser = require('body-parser');
import { connect } from 'mongoose';
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
export default class Bot {

    /**
     * @typedef {Object} BotOptions
     * @property {Object} handlers
     * @property {Array} defaultActions
     * @property {Function} userLoaderFactory
     * @property {Object} db
     * @property {Object} sendMiddlewares
     */

    public actions: Actions;
    private handlers: any;
    private defaultActions: any;

    private postbackRouter: PostbackRouter;
    private locationRouter: ContextRouter;
    private referralsRouter: ReferralsRouter;
    private intentRouter: IntentRouter;
    private textMatcher: TextMatcher;
    private sentimentRouter: ContextRouter;

    private adapter: GenericAdapter;
    private yesNoAnswer: any;
    private complexNlp: any;
    private timeoutPromise: (millis: number) => Promise<{}>;
    private defaultMessages: any;

    private _sender: any;
    private fb: {
        startsTyping: any;
        stopsTyping?: any;
    }
    /**
     * 
     * Create a Bot 
     * @param {BotOptions} options - The options of the bot
     */
    constructor({ adapter, handlers = {}, defaultActions = [], userModelFactory = null, sendMiddlewares = {} }: { adapter: GenericAdapter, handlers: any, defaultActions: any[], userModelFactory: any, sendMiddlewares: any }) {
        this.actions = new Actions(sendMiddlewares);

        this.handlers = {};

        this.defaultActions = {};
        if (defaultActions.length > 0)
            this.defaultActions = generateDefaultActions(this.actions, defaultActions);

        // TODO: Add adapter specific things
        this.adapter = adapter;

        // Create routers
        this.postbackRouter = new PostbackRouter();
        this.locationRouter = new ContextRouter({ field: '_context.step' });
        this.referralsRouter = new ReferralsRouter();
        this.intentRouter = new IntentRouter();
        this.textMatcher = new TextMatcher();
        this.sentimentRouter = new ContextRouter({ field: '_context.step' });

        adapter.setRouters({
            PostbackRouter: this.postbackRouter
        });

        adapter.initWebhook();

        this._sender = adapter.sender();
        this.fb = {
            startsTyping: adapter.startsTyping()
        };
        
        
        // TODO: ?
        if ('yesNoAnswerFactory' in handlers) {
            this.yesNoAnswer = handlers.yesNoAnswerFactory(this.adapter, this.sentimentRouter);
        }

        if ('nlpHandlerFactory' in handlers) {
            this.complexNlp = handlers.nlpHandlerFactory(this.adapter);
        }

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
    start({ port = 3000, route = '/fb', FB_WEBHOOK_KEY = "123", FB_PAGE_ID = "", mongodbUri = "" }) {
        const app = express();
        app.use(bodyParser());
        // Connect to database
        connect(mongodbUri, { useNewUrlParser: true });
        const handlers = {
            // Main Handlers
            attachmentHandler: this.attachmentHandler(),
            textHandler: this.textHandler(),
            // Routes
            referralsRouter: this.referralsRouter,
            postbackRouter: this.postbackRouter
        }

        app.use(this.adapter.webhook);
        // TODO: add adapter
        app.get('/', (req, res) => res.send("Built with <a href=\"https://github.com/chrispanag/ebony\">Ebony Framework</a>"));
        app.listen(port);

        console.log(`Bot is listening on port: ${port}`);
    }

    /**
     * @returns {function} - Returns an nlpHandler
     */
    nlpHandler() {
        return nlpHandlerFactory(this.intentRouter, this.yesNoAnswer, this.complexNlp);
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
        return attachmentHandlerFactory(this.locationHandlerFactory(), this.yesNoAnswer, this.defaultMessages, this.adapter);
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
    scenario(id: string): Scenario {
        const that = this;
        const scenarios: Scenario = {
            _actions: [],
            end: async (): Promise<void> => {
                for (const action of scenarios._actions) {
                    const properties = action.call.split('.');
                    let obj: { [key: string]: any } | ((...params: any) => Promise<void>) = that;
                    for (const property of properties) {
                        if (typeof obj === 'object') {
                            obj = obj[property] as { [key: string]: any } | ((...params: any) => Promise<void>);
                        }
                    }
                    if (typeof obj === 'function') {
                        await obj(...action.params);
                    } else {
                        throw new Error("Issue on scenario.end()");
                    }
                }
                scenarios._actions = [];
            },
            send: (message: any, options: any = {}) => {
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

function timeoutPromise(millis: number) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), millis);
    });
}


interface Scenario {
    _actions: Action[];
    types: () => Scenario;
    typeAndWait: (millis: number) => Scenario;
    wait: (millis: number) => Scenario;
    end: () => Promise<void>;
    send: (message: any, options: any) => Scenario;
}

interface Action {
    call: string;
    params: any[]
}