import { GenericAdapter, IInteraction } from '@ebenos/framework';
import express, { Request, Response, RequestHandler, Express } from 'express';

import webhook from './webhook';
import { senderFactory, SenderFunction } from './sender';
import messagingWebhook from '../webhooks/messaging';
import { userLoader as messengerUserLoader } from './MessengerUser';
import { UserDataFields, MessagingOptions } from './interfaces/messengerAPI';
import bodyParser from 'body-parser';
export interface MessengerWebhookOptions {
    webhookKey?: string;
    route?: string;
    pageId: string;
    appSecret: string;
    pageToken: string;
}

export interface MessengerOperations {
    handover: (id: string) => Promise<void>;
}

export default class MessengerAdapter extends GenericAdapter<MessengerOperations> {
    private webhookKey: string;
    private pageToken: string;
    private route: string;
    private pageId: string;
    private userLoader: (id: string) => Promise<any>;

    public getUserData: (id: string, fields: UserDataFields[]) => Promise<void>;
    public operations: MessengerOperations;
    public sender: (
        actions: Array<IInteraction<MessagingOptions>>,
        type: 'ORDERED' | 'UNORDERED'
    ) => Promise<void>;
    public webhook: Express;

    constructor(
        options: MessengerWebhookOptions,
        userLoader?: (id: string) => Promise<any>,
        sendFunction?: SenderFunction,
        domain?: string
    ) {
        const { route = '/fb', webhookKey = 'ebony123', pageId, pageToken } = options;

        super();
        this.webhookKey = webhookKey;
        this.pageToken = pageToken;
        this.pageId = pageId;
        this.route = route;
        const { send, getUserData, handover } = senderFactory(pageToken, sendFunction, domain);

        this.sender = send;
        this.getUserData = getUserData;
        this.operations = {
            handover
        };
        this.webhook = express();
        this.webhook.use(bodyParser.json());

        if (userLoader) {
            this.userLoader = userLoader;
        } else {
            this.userLoader = messengerUserLoader(this.pageToken);
        }
    }

    public initialization(): void {
        const messaging = messagingWebhook({
            userLoader: this.userLoader,
            routers: this.routers,
            handlers: this.handlers
        });

        // Facebook specific endpoints
        this.webhook.get(this.route, this.validationEndpoint());
        this.webhook.post(this.route, webhook(this.pageId, { messaging }));
    }

    private validationEndpoint(): RequestHandler {
        const webhookKey = this.webhookKey;

        return (req: Request, res: Response) => {
            if (
                req.query['hub.mode'] === 'subscribe' &&
                req.query['hub.verify_token'] === webhookKey
            ) {
                console.log('Validating webhook');
                return res.status(200).send(req.query['hub.challenge']);
            }

            console.error('Failed validation. Make sure the validation tokens match.');
            return res.sendStatus(400);
        };
    }
}
