/**
 * ebony-framework
 *
 * @module bot
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 */

import { Scenario, Module, BotOptions } from './botInterfaces';

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
import { connect } from 'mongoose';

import generateDefaultActions from './utilities/generateDefaultActions'

import createScenario from './utilities/scenario';
import { start } from './utilities/server';

function defaultNlpHandler() {
    return Promise.resolve();
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

    private adapters: { [key: string]: GenericAdapter<any> };
    private yesNoAnswer: any;
    public complexNlp: (...params: any) => Promise<any>;
    private defaultMessages: any;

    /**
     * Create a Bot
     */
    constructor(adapters: Array<GenericAdapter<any>>, options: BotOptions) {
        const {
            defaultActions = [],
            sendMiddlewares = {},
            mongodbUri
        } = options;

        this.actions = new Actions(sendMiddlewares);
        this.app = express();
        this.mongodbUri = mongodbUri;

        this.adapters = {};

        this.defaultActions = {};
        if (defaultActions.length > 0) {
            this.defaultActions = generateDefaultActions(this.actions, defaultActions);
        }

        // Create routers
        this.postbackRouter = new PostbackRouter();
        this.locationRouter = new ContextRouter({ field: 'context.step' });
        this.referralsRouter = new ReferralsRouter();
        this.intentRouter = new IntentRouter();
        this.textMatcher = new TextMatcher();
        this.sentimentRouter = new ContextRouter({ field: 'context.step' });

        this.complexNlp = defaultNlpHandler;

        const routers = {
            postbackRouter: this.postbackRouter,
            referralsRouter: this.referralsRouter,
            textMatcher: this.textMatcher
        };

        const handlers = {
            text: this.textHandler()
        };

        adapters.forEach((adapter) => {
            adapter.init(routers, handlers);

            this.adapters[adapter.provider] = adapter;
        });
    }

    /**
     * This initiates the webhook and the bot starts listening
     * @param {WebhookOptions} options - The options of the webhook
     * @returns {void}
     */
    public async start({ port = 3000, route = '/bot' }) {
        // Connect to database
        await connect(this.mongodbUri, { useNewUrlParser: true });
        start(this.app, port, route, this.adapters);

        console.log(`Bot is listening on port: ${port}`);
    }

    public locationHandlerFactory() {
        const locationRouter = this.locationRouter;
        const locationFallback = this.defaultActions.locationFallback;

        return (user: User, coordinates: any) => {
            const res = locationRouter.getContextRoute(user, coordinates);

            if (!res) {
                return locationFallback(user, coordinates);
            }

            return res;
        };
    }

    public attachmentHandler() {
        return attachmentHandlerFactory(this.locationHandlerFactory(), this.yesNoAnswer, this.defaultMessages);
    }

    public textHandler() {
        const nlpHandler = nlpHandlerFactory(this.intentRouter, this.yesNoAnswer).bind(this);
        return textHandlerFactory(this.textMatcher, nlpHandler).bind(this);
    }

    /**
     * Adds a Module to the chatbot
     */
    public addModule(module: Module) {
        const {
            routes = {},
            actions = {},
            intents = {},
            referrals = {},
            text = [],
            nlp = () => Promise.resolve()
        } = module;

        this.postbackRouter.importRoutes(routes);
        this.actions.importActions(actions);
        this.intentRouter.importRoutes(intents);
        this.referralsRouter.importRoutes(referrals);
        this.textMatcher.importRules(text);

        this.complexNlp = nlp;
    }

    // Actions
    public scenario(user: User): Scenario {
        if (user.provider in this.adapters) {
            return createScenario(user.id, this.adapters[user.provider]);
        }

        throw new Error(`Provider: ${user.provider} doesn't exist!`);
    }
}
