/**
 * ebony-framework
 * 
 * @module bot
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 */

import express, { Express } from 'express';
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
import { connect, mongo } from 'mongoose';
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

interface BotOptions {
    defaultActions: any[], 
    userModelFactory: any, 
    sendMiddlewares: any, 
    mongodbUri: string 
}
/**
 * The Bot Class
 */
export default class Bot {
    public actions: Actions;
    public app: Express;

    private defaultActions: any;
    private mongodbUri: string;

    private postbackRouter: PostbackRouter;
    private locationRouter: ContextRouter;
    private referralsRouter: ReferralsRouter;
    private intentRouter: IntentRouter;
    private textMatcher: TextMatcher;
    private sentimentRouter: ContextRouter;

    private adapter: GenericAdapter;
    private yesNoAnswer: any;
    private complexNlp: any;
    private defaultMessages: any;

    /**
     * Create a Bot 
     */
    constructor(adapter: GenericAdapter, options: BotOptions) {
        const {
            defaultActions = [], 
            sendMiddlewares = {}, 
            mongodbUri 
        } = options;

        this.actions = new Actions(sendMiddlewares);
        this.app = express();
        this.mongodbUri = mongodbUri;

        this.adapter = adapter;

        this.defaultActions = {};
        if (defaultActions.length > 0)
            this.defaultActions = generateDefaultActions(this.actions, defaultActions);

        // Create routers
        this.postbackRouter = new PostbackRouter();
        this.locationRouter = new ContextRouter({ field: 'context.step' });
        this.referralsRouter = new ReferralsRouter();
        this.intentRouter = new IntentRouter();
        this.textMatcher = new TextMatcher();
        this.sentimentRouter = new ContextRouter({ field: 'context.step' });

        adapter.setRouters({
            PostbackRouter: this.postbackRouter,
            ReferralsRouter: this.referralsRouter,
            TextMatcher: this.textMatcher
        });

        adapter.initWebhook();
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
    start({ port = 3000, route = '/bot' }) {
        this.app.use(route, bodyParser());
        // Connect to database
        connect(this.mongodbUri, { useNewUrlParser: true });

        this.app.use(route, this.adapter.webhook);
        this.app.listen(port);

        console.log(`Bot is listening on port: ${port}`);
    }

    nlpHandler() {
        return nlpHandlerFactory(this.intentRouter, this.yesNoAnswer, this.complexNlp);
    }

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

    attachmentHandler() {
        return attachmentHandlerFactory(this.locationHandlerFactory(), this.yesNoAnswer, this.defaultMessages, this.adapter);
    }

    textHandler() {
        return textHandlerFactory(this.textMatcher, this.nlpHandler());
    }

    /**
     * Adds a Module to the chatbot
     */
    addModule(module: Module) {
        const { routes = {}, actions = {}, intents = {}, referrals = {}, text = [] } = module;
        this.postbackRouter.importRoutes(routes);
        this.actions.importActions(actions);
        this.intentRouter.importRoutes(intents);
        this.referralsRouter.importRoutes(referrals);
        this.textMatcher.importRules(text);
    }

    // Actions 
    scenario(id: string): Scenario {
        const that: Bot = this;

        const scenarios: Scenario = {
            _actions: [],
            end: async (): Promise<void> => {
                for (const action of scenarios._actions) {
                    const properties = action.call.split('.');
                    let obj: { [key: string]: any } | ((...params: any) => Promise<void>) = that.adapter;
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
                    call: 'sender',
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
                    call: 'wait',
                    params: [millis]
                });
                return scenarios;
            },
            types: () => {
                scenarios._actions.push({
                    call: 'startsTyping',
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

interface Module {
    routes?: { [key: string]: any },
    actions?: { [key: string]: any },
    intents?: { [key: string]: any },
    referrals?: { [key: string]: any },
    text?: any[]
}