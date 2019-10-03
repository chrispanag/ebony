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

import { Scenario, Module, BotOptions } from './interfaces/bot';

import GenericAdapter, { EbonyHandlers } from './adapter';

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

import generateDefaultActions from './utilities/generateDefaultActions';

import createScenario from './utilities/scenario';
import { start } from './utilities/server';
import locationHandlerFactory from './handlers/location';

/**
 * The Bot Class
 */
export default class Bot<U extends User> {
    public readonly app = express();

    // Routers
    private postbackRouter = new PostbackRouter();
    private locationRouter = new ContextRouter({ field: 'context.step' });
    private referralsRouter = new ReferralsRouter();
    private intentRouter = new IntentRouter();
    private textMatcher = new TextMatcher();
    private sentimentRouter = new ContextRouter({ field: 'context.step' });

    public actions: Actions<U>;

    private defaultActions: any;
    private mongodbUri: string;

    private adapters: { [key: string]: GenericAdapter<U> };
    private yesNoAnswer: any;
    public complexNlp: (...params: any) => Promise<any>;
    private defaultMessages: any;

    /**
     * Create a Bot
     */
    constructor(adapters: Array<GenericAdapter<U>>, options: BotOptions<U>) {
        const {
            defaultActions = [],
            preSendMiddlewares = [],
            postSendMiddlewares = [],
            mongodbUri
        } = options;

        this.actions = new Actions<U>(preSendMiddlewares, postSendMiddlewares);
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

        const locationHandler = locationHandlerFactory<U>(
            this.locationRouter,
            this.defaultActions.locationFallback,
            this.actions
        );

        const nlpHandler = nlpHandlerFactory<U>(this.intentRouter, this.yesNoAnswer).bind(this);

        const handlers = {
            text: textHandlerFactory<U>(this.textMatcher, nlpHandler).bind(this),
            attachment: attachmentHandlerFactory<U>(locationHandler, this.yesNoAnswer, this.defaultMessages)
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
        await connect(this.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
        start(this.app, port, route, this.adapters);

        console.log(`Bot is listening on port: ${port}`);
    }

    /**
     * Adds a Module to the chatbot
     */
    public addModule(module: Module<U>) {
        const {
            routes = {},
            actions = {},
            intents = {},
            referrals = {},
            text = [],
            nlp = () => Promise.resolve(),
            preMiddlewares = [],
            postMiddlewares = []
        } = module;

        this.actions.importActions(actions);
        this.actions.addMiddlewares('pre', preMiddlewares);
        this.actions.addMiddlewares('post', postMiddlewares);

        this.postbackRouter.importRoutes(routes);
        this.intentRouter.importRoutes(intents);
        this.referralsRouter.importRoutes(referrals);
        this.textMatcher.importRules(text);

        this.complexNlp = nlp;
    }

    // Actions
    public scenario(user: U): Scenario<GenericAdapter<U>, U> {
        if (user.provider in this.adapters) {
            return createScenario<U>(user.id, this.adapters[user.provider]);
        }

        throw new Error(`Provider: ${user.provider} doesn't exist!`);
    }
}

function defaultNlpHandler() {
    return Promise.resolve();
}