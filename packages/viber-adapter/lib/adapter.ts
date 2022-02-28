import {
    EbonyHandlers,
    GenericAdapter,
    GenericAttachment,
    IRouters
} from '@ebonydevcopy/framework';
import express, { Request, Response } from 'express';
import { json as bodyParser } from 'body-parser';
import senderFactory from './sender';
import {
    IViberMessageEvent,
    IViberSender,
    WebhookIncomingViberEvent,
    IViberUnsubscribedEvent,
    IViberSubscribedEvent,
    IViberConversationStartedEvent
} from './interfaces/webhook';
import { setWebhook } from './api/requests';
import { IViberSetWebhookResult } from './interfaces/api';
import {
    isMediaMessage,
    IViberLocationMessage,
    IViberTextMessage
} from './interfaces/message_types';
import { isPostbackTrackingData } from './interfaces/tracking_data';
import { ITrackingData, IUser } from '@ebonydevcopy/framework';

export interface IViberOptions<U> {
    route?: string;
    authToken: string;
    welcomeMessage?: Record<string, unknown>;
    userLoader?: (userData: IUser) => Promise<U>;
    webhookHanlers?: IViberWebhookHandlers;
}

export interface IViberWebhookHandlers {
    unsubscribeWebhook?: (e: IViberUnsubscribedEvent) => Promise<void>;
    subscribeWebhook?: (e: IViberSubscribedEvent) => Promise<void>;
    conversationStartedWebhook?: (e: IViberConversationStartedEvent) => Promise<void>;
}

export default class ViberAdapter<U extends IUser> extends GenericAdapter {
    public operations = {
        handover: (): Promise<void> => {
            console.log('Not implemented!');
            return Promise.resolve();
        }
    };

    public sender;

    private welcomeMessage?: Record<string, unknown>;
    private webhookHanlers?: IViberWebhookHandlers;
    private route: string;
    private authToken: string;
    public webhook = express();
    private userLoader?: (userData: IUser) => Promise<U>;

    constructor(options: IViberOptions<U>) {
        super();
        const {
            route = '/viber/webhook',
            authToken,
            welcomeMessage,
            userLoader,
            webhookHanlers
        } = options;

        this.route = route;
        this.authToken = authToken;
        this.sender = senderFactory(this.authToken);
        this.welcomeMessage = welcomeMessage;
        this.userLoader = userLoader;
        this.webhookHanlers = webhookHanlers;
    }

    public async initialization(): Promise<void> {
        this.webhook.use(bodyParser());
        this.webhook.post(
            this.route,
            await viberWebhookFactory(
                this.routers,
                this.handlers,
                this.welcomeMessage,
                this.userLoader,
                this.webhookHanlers
            )
        );
    }

    public setWebhook(url: string): Promise<IViberSetWebhookResult> {
        return setWebhook(url + this.route, this.authToken);
    }
}

function convertViberSenderToUser(sender: IViberSender): IUser {
    return {
        id: sender.id,
        firstName: sender.name,
        lastName: sender.name,
        data: {
            country: sender.country,
            avatar: sender.avatar,
            api_version: sender.api_version,
            language: sender.language
        }
    };
}

function handleTextMessage(
    m: IViberTextMessage | IViberLocationMessage,
    user: IUser,
    textHandler: EbonyHandlers<any>['text'],
    routers: IRouters
) {
    if (textHandler === undefined) {
        console.log('No text handler');
        return;
    }
    const text = m.text ? m.text : 'user_send_location';
    const location = m.type === 'location' ? m.location : undefined;

    let tracking_data: ITrackingData;
    try {
        // Tracking Data is an object
        tracking_data = JSON.parse(m.tracking_data) as ITrackingData;
    } catch {
        // Tracking Data is a string
        tracking_data = m.tracking_data;
    }

    if (isPostbackTrackingData(tracking_data)) {
        // Tracking Data is a postback
        const payload = JSON.stringify({
            type: tracking_data.type,
            text,
            location,
            tracking_data
        });
        routerExists(routers.PostbackRouter).objectPayloadHandler(payload, user);
        return;
    }

    textHandler({ text, tracking_data, location }, undefined, user);
    return;
}

async function viberWebhookFactory<U extends IUser>(
    routers: IRouters,
    handlers: EbonyHandlers<any>,
    welcomeMessage?: Record<string, unknown>,
    userLoader?: (userData: IUser) => Promise<U>,
    webhooks?: {
        unsubscribeWebhook?: (e: IViberUnsubscribedEvent) => Promise<void>;
        subscribeWebhook?: (e: IViberSubscribedEvent) => Promise<void>;
        conversationStartedWebhook?: (e: IViberConversationStartedEvent) => Promise<void>;
    }
) {
    async function messageWebhook(e: IViberMessageEvent): Promise<void> {
        const user = userLoader
            ? await userLoader(convertViberSenderToUser(e.sender))
            : convertViberSenderToUser(e.sender);

        switch (e.message.type) {
            case 'text':
            case 'location':
                handleTextMessage(e.message, user, handlers.text, routers);
                return;
            default:
                if (isMediaMessage(e.message)) {
                    if (handlers.attachment !== undefined) {
                        handlers.attachment(user, e.message as unknown as GenericAttachment);
                        return;
                    }
                    console.log('Not implemented!');
                    return;
                }
                console.log('Not implemented!');
                return;
        }
    }

    return (req: Request, res: Response) => {
        const body = req.body as WebhookIncomingViberEvent;

        if (body.event !== 'conversation_started') {
            res.status(200).send();
        }

        switch (body.event) {
            case 'message':
                messageWebhook(body);
                return;
            case 'seen':
                console.log('seen');
                return;
            case 'conversation_started':
                if (webhooks?.conversationStartedWebhook) webhooks.conversationStartedWebhook(body);
                console.log('conversation_started');
                if (welcomeMessage !== undefined) {
                    res.json(welcomeMessage);
                } else {
                    res.status(200).send();
                }
                return;
            case 'delivered':
                console.log('delivered');
                return;
            case 'subscribed':
                if (webhooks?.subscribeWebhook) webhooks.subscribeWebhook(body);
                console.log('subscribed');
                return;
            case 'unsubscribed':
                if (webhooks?.unsubscribeWebhook) webhooks.unsubscribeWebhook(body);
                else console.log('unsubscribed');
                return;
            case 'failed':
                console.log(`Failed: ${body.desc}`);
                return;
            case 'client_status':
                console.log('client_status');
                return;
            case 'webhook':
                console.log('Webhook connected');
                return;
            default:
                console.log('Unknown event type: ' + body);
                return;
        }
    };
}

function routerExists<T>(router: T | undefined): T {
    if (typeof router === 'undefined') {
        throw new Error('Router is undefined');
    }

    return router;
}
