/**
 * ebony-framework
 *
 * @module bot
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 */

import { connect } from 'mongoose';
import express from 'express';

import { Scenario, Module, BotOptions } from './botInterfaces';

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
import TextMatcher from './routers/TextMatcher';

import generateDefaultActions from './utilities/generateDefaultActions'

import createScenario from './utilities/scenario';
import { start } from './utilities/server';

/**
 * The Bot Class
 */
export default class Bot {
    public readonly app = express();

    // Routers
    private postbackRouter = new PostbackRouter();
    private locationRouter = new ContextRouter({ field: 'context.step' });
    private referralsRouter = new ReferralsRouter()
    private intentRouter = new IntentRouter();
    private textMatcher = new TextMatcher();
    private sentimentRouter = new ContextRouter({ field: 'context.step' });

    public actions: Actions;

    private defaultActions: any;
    private mongodbUri: string;

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
        this.mongodbUri = mongodbUri;

        this.adapters = {};

        this.defaultActions = {};
        if (defaultActions.length > 0) {
            this.defaultActions = generateDefaultActions(this.actions, defaultActions);
        }

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
        const nlpHandler = nlpHandlerFactory(this.intentRouter, this.yesNoAnswer, this.complexNlp).bind(this);
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

function defaultNlpHandler() {
    return Promise.resolve();
}