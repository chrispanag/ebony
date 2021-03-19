import { GenericAdapter } from '@ebenos/framework';
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
        handover: (id: string): Promise<void> => {
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
        this.webhook.post(this.route, viberWebhookFactory());
    }

    public setWebhook(url: string): Promise<IViberSetWebhookResult> {
        return setWebhook(url + this.route, this.authToken);
    }
}

function viberWebhookFactory() {
    return (req: Request, res: Response) => {
        const body = req.body as WebhookIncomingViberEvent;

        switch (body.event) {
            case 'message':
                console.log('message');
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
