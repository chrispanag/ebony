import { GenericAdapter } from '@ebenos/framework';
import express from 'express';
import { json as bodyParser } from 'body-parser';
import sender from './sender';

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
        this.webhook.post(this.route, () => console.log('something'));
    }
}
