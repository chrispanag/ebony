import { GenericAdapter, User, IInteraction } from '@ebenos/framework';
import { UserModel } from '@ebenos/framework';
import { Request, Response, RequestHandler } from 'express';

import webhook from './webhook';
import { senderFactory, SenderFunction } from './sender';
import messagingWebhook from '../webhooks/messaging';
import MessengerUser from './MessengerUser';
import { UserDataFields, MessagingOptions } from './interfaces/messengerAPI';

export interface MessengerWebhookOptions<T extends MessengerUser> {
    webhookKey?: string;
    route?: string;
    pageId: string;
    appSecret: string;
    pageToken: string;
    userModel?: UserModel<T>;
}

export interface MessengerOperations {
    handover: (id: string) => Promise<void>;
}

export default class MessengerAdapter<T extends MessengerUser> extends GenericAdapter<T, MessengerOperations> {
    private webhookKey: string;
    private pageToken: string;
    private route: string;
    private pageId: string;

    public getUserData: (id: string, fields: UserDataFields[]) => Promise<void>;
    public operations: MessengerOperations;
    public sender: (
        actions: Array<IInteraction<MessagingOptions>>,
        type: 'ORDERED' | 'UNORDERED'
    ) => Promise<void>;

    constructor(
        options: MessengerWebhookOptions<T>,
        sendFunction?: SenderFunction,
        domain?: string
    ) {
        const {
            route = '/fb',
            webhookKey = 'ebony123',
            pageId,
            pageToken,
            userModel = MessengerUser
        } = options;

        super('messenger', userModel);
        this.webhookKey = webhookKey;
        this.pageToken = pageToken;
        this.pageId = pageId;
        this.route = route;
        const { send, getUserData, handover } = senderFactory(
            pageToken,
            sendFunction,
            domain
        );

        this.sender = send;
        this.getUserData = getUserData;
        this.operations = {
            handover
        };
    }

    public initWebhook() {
        const messaging = messagingWebhook({
            userLoader: this.userLoader(),
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

    public userLoader(): (id: string) => Promise<T> {
        return async (id: string) => {
            try {
                const userData = await User.findByProviderId(id);
                if (!userData) {
                    const newUser = new this.userModel(
                        {
                            id,
                            provider: this.providerName
                        },
                        this.pageToken
                    ) as T;
                    await newUser.getFacebookData();
                    await newUser.save();

                    return newUser;
                }

                return new this.userModel(userData, this.pageToken) as T;
            } catch (err) {
                throw err;
            }
        };
    }
}
