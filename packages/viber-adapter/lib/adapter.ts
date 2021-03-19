import { EbonyHandlers, GenericAdapter, IRouters } from '@ebenos/framework';
import express, { Request, Response } from 'express';
import { json as bodyParser } from 'body-parser';
import senderFactory from './sender';
import { IViberMessageEvent, IViberSender, WebhookIncomingViberEvent } from './interfaces/webhook';
import { setWebhook } from './api/requests';
import { IViberSetWebhookResult } from './interfaces/api';
import { IUser } from '@ebenos/framework/lib/models/UserSchema';

export interface IViberOptions {
    route?: string;
    authToken: string;
}

export default class ViberAdapter extends GenericAdapter {
    public operations = {
        handover: (): Promise<void> => {
            console.log('Not implemented!');
            return Promise.resolve();
        }
    };

    public sender;
    private route: string;
    private authToken: string;
    public webhook = express();

    constructor(options: IViberOptions) {
        super();
        const { route = '/viber/webhook', authToken } = options;

        this.route = route;
        this.authToken = authToken;
        this.sender = senderFactory(this.authToken);
    }

    public initialization(): void {
        this.webhook.use(bodyParser());
        this.webhook.post(this.route, viberWebhookFactory(this.routers, this.handlers));
    }

    public setWebhook(url: string): Promise<IViberSetWebhookResult> {
        return setWebhook(url + this.route, this.authToken);
    }
}

function convertViberSenderToUser(sender: IViberSender): IUser {
    return {
        id: sender.id,
        firstName: sender.name,
        data: {
            country: sender.country,
            avatar: sender.avatar,
            api_version: sender.api_version,
            language: sender.language
        }
    };
}

function viberWebhookFactory(routers: IRouters, handlers: EbonyHandlers<any>) {
    function messageWebhook(e: IViberMessageEvent): void {
        switch (e.message.type) {
            case 'text':
                if (handlers.text !== undefined) {
                    handlers.text(
                        { text: e.message.text },
                        undefined,
                        convertViberSenderToUser(e.sender)
                    );
                    return;
                }

                console.log('No text handler');
                return;
            default:
                console.log('Not implemented!');
                return;
        }
    }

    return (req: Request, res: Response) => {
        const body = req.body as WebhookIncomingViberEvent;

        res.status(200).send();

        switch (body.event) {
            case 'message':
                messageWebhook(body);
                return;
            case 'seen':
                console.log('seen');
                return;
            case 'conversation_started':
                console.log('conversation_started');
                return;
            case 'delivered':
                console.log('delivered');
                return;
            case 'subscribed':
                console.log('subscribed');
                return;
            case 'unsubscribed':
                console.log('unsubscribed');
                return;
            case 'failed':
                console.log('failed');
                return;
            case 'webhook':
                console.log('webhook');
                return;
            case 'client_status':
                console.log('client_status');
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
