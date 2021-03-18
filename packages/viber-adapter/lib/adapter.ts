import { GenericAdapter } from '@ebenos/framework';
import express, { Request, Response } from 'express';
import { json as bodyParser } from 'body-parser';
import sender from './sender';
import { WebhookIncomingViberEvent } from './interfaces/webhook';

export interface IViberOptions {
    route: string;
}

export default class ViberAdapter extends GenericAdapter<null> {
    public operations = null;
    public sender = sender;
    private route: string;
    public webhook = express();

    constructor(options: IViberOptions) {
        super();
        const { route = '/viber/webhook' } = options;

        this.route = route;
    }

    public initialization(): void {
        this.webhook.use(bodyParser());
        this.webhook.post(this.route, () => viberWebhookFactory());
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
        }

        res.status(200);
        return;
    };
}
