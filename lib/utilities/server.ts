import { Application } from 'express';
import bodyParser = require('body-parser');
import { GenericAdapter } from '..';

interface Adapters {
    [key: string]: GenericAdapter<any>;
}

export function start(app: Application, port: number, route: string, adapters: Adapters) {
    app.use(route, bodyParser());

    for (const provider in adapters) {
        if (adapters[provider]) {
            app.use(route, adapters[provider].webhook);
        }
    }

    app.listen(port);
}