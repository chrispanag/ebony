import { EbonyHandlers, GenericAdapter, IRouters } from '@ebenos/framework';
import express, { Request, Response } from 'express';
import { json as bodyParser } from 'body-parser';
import sender from './sender';
import { WebhookIncomingViberEvent } from './interfaces/webhook';
import { setWebhook } from './api/requests';
import { IViberSetWebhookResult } from './interfaces/api';

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
    public sender = sender;
    private route: string;
    private authToken: string;
    public webhook = express();

    constructor(options: IViberOptions) {
        super();
        const { route = '/viber/webhook', authToken } = options;

        this.route = route;
        this.authToken = authToken;
    }

    public initialization(): void {
        this.webhook.use(bodyParser());
        this.webhook.post(this.route, viberWebhookFactory(this.routers, this.handlers));
    }

    public setWebhook(url: string): Promise<IViberSetWebhookResult> {
        return setWebhook(url + this.route, this.authToken);
    }
}

function viberWebhookFactory(routers: IRouters, handlers: EbonyHandlers<any>) {
    return (req: Request, res: Response) => {
        const body = req.body as WebhookIncomingViberEvent;

        switch (body.event) {
            case 'message':
                if (body.message.type === 'text') {
                    if (handlers.text !== undefined) {
                        handlers.text({ text: body.message.text }, undefined, body.sender);
                    } else {
                        console.log('No text handler');
                    }
                } else {
                    console.log('Not implemented!');
                }
                break;
            case 'seen':
                console.log('seen');
                break;
            case 'conversation_started':
                console.log('conversation_started');
                break;
            case 'delivered':
                console.log('delivered');
                break;
            case 'subscribed':
                console.log('subscribed');
                break;
            case 'unsubscribed':
                console.log('unsubscribed');
                break;
            case 'failed':
                console.log('failed');
                break;
            case 'webhook':
                console.log('webhook');
                break;
            case 'client_status':
                console.log('client_status');
                break;
            default:
                console.log('Unknown event type: ' + body);
                break;
        }

        res.status(200).send();
        return;
    };
}

function routerExists<T>(router: T | undefined): T {
    if (typeof router === 'undefined') {
        throw new Error('Router is undefined');
    }

    return router;
}
