import {
    EbonyHandlers,
    GenericAdapter,
    GenericAttachment,
    IRouters,
    ITrackingData,
    IUser
} from '@ebenos/framework';
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
    IViberContactMessage,
    IViberLocationMessage,
    IViberTextMessage
} from './interfaces/message_types';
import { isPostbackTrackingData } from './interfaces/tracking_data';

export interface IViberOptions<U> {
    route?: string;
    authToken: string;
    welcomeMessage?: Record<string, unknown>;
    userLoader?: (userData: IUser) => Promise<U>;
    webhookHandlers?: IViberWebhookHandlers;
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
    private webhookHandlers?: IViberWebhookHandlers;
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
            webhookHandlers
        } = options;

        this.route = route;
        this.authToken = authToken;
        this.sender = senderFactory(this.authToken);
        this.welcomeMessage = welcomeMessage;
        this.userLoader = userLoader;
        this.webhookHandlers = webhookHandlers;
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
                this.webhookHandlers
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
    m: IViberTextMessage | IViberLocationMessage | IViberContactMessage,
    user: IUser,
    textHandler: EbonyHandlers<any>['text'],
    routers: IRouters
) {
    if (textHandler === undefined) {
        console.log('No text handler');
        return;
    }
    const text = m.text;
    const location = m.type === 'location' ? m.location : undefined;
    const contact = m.type === 'contact' ? m.contact : undefined;

    let tracking_data: ITrackingData;
    try {
        // Tracking Data is an object
        tracking_data = JSON.parse(m.tracking_data) as ITrackingData;
    } catch {
        console.log('Tracking data not an object');
        tracking_data = { data: m.tracking_data };
    }

    if (isPostbackTrackingData(tracking_data)) {
        // Tracking Data is a postback
        const payload = JSON.stringify({
            type: tracking_data.type,
            text,
            location,
            contact,
            tracking_data
        });
        routerExists(routers.PostbackRouter).objectPayloadHandler(payload, user);
        return;
    }

    textHandler({ text, tracking_data, location, contact }, undefined, user);
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
            case 'contact':
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
        switch (body.event) {
            case 'message':
                messageWebhook(body);
                break;
            case 'conversation_started':
                console.log('conversation_started');
                if (webhooks?.conversationStartedWebhook) webhooks.conversationStartedWebhook(body);
                if (welcomeMessage !== undefined) {
                    res.json(welcomeMessage);
                    return;
                }
                break;
            case 'subscribed':
                if (webhooks?.subscribeWebhook) webhooks.subscribeWebhook(body);
                console.log('subscribed');
                break;
            case 'unsubscribed':
                if (webhooks?.unsubscribeWebhook) webhooks.unsubscribeWebhook(body);
                console.log('unsubscribed');
                break;
            case 'seen':
                console.log('seen');
                break;
            case 'delivered':
                console.log('delivered');
                break;
            case 'failed':
                console.log(`Failed: ${body.desc}`);
                break;
            case 'client_status':
                console.log('client_status');
                break;
            case 'webhook':
                console.log('Webhook connected');
                break;
            default:
                console.log('Unknown event type: ' + body);
                break;
        }
        res.status(200).send();
    };
}

function routerExists<T>(router: T | undefined): T {
    if (typeof router === 'undefined') {
        throw new Error('Router is undefined');
    }

    return router;
}
