/**
 * ebony-framework
 *
 * @module bot
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 */

import { Scenario, Module} from './botInterfaces';

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

import createScenario from './utilities/scenario';
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
    defaultActions: any[];
    userModelFactory: any;
    sendMiddlewares: any;
    mongodbUri: string;
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
    private complexNlp: any;
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

        adapters.forEach((adapter) => {
            adapter.setRouters({
                PostbackRouter: this.postbackRouter,
                ReferralsRouter: this.referralsRouter,
                TextMatcher: this.textMatcher
            });

            adapter.initWebhook();

            this.adapters[adapter.provider] = adapter;
        });
    }

    /**
     * This initiates the webhook and the bot starts listening
     * @param {WebhookOptions} options - The options of the webhook
     * @returns {void}
     */
    public start({ port = 3000, route = '/bot' }) {
        this.app.use(route, bodyParser());
        // Connect to database
        connect(this.mongodbUri, { useNewUrlParser: true });

        for (const provider in this.adapters) {
            if (this.adapters[provider]) {
                this.app.use(route, this.adapters[provider].webhook);
            }
        }

        this.app.listen(port);

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

    public cattachmentHandler() {
        return attachmentHandlerFactory(this.locationHandlerFactory(), this.yesNoAnswer, this.defaultMessages);
    }

    public textHandler() {
        return textHandlerFactory(this.textMatcher, nlpHandlerFactory(this.intentRouter, this.yesNoAnswer, this.complexNlp));
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
        console.log(user.provider);
        if (user.provider in this.adapters) {
            return createScenario(user.id, this.adapters[user.provider]);
        }

        throw new Error(`Provider: ${user.provider} doesn't exist!`);
    }
}
