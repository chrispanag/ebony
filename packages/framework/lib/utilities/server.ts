import { Application } from 'express';
import bodyParser = require('body-parser');
import { GenericAdapter, User } from '..';

interface Adapters<U extends User> {
    [key: string]: GenericAdapter<U>;
}

export function start<U extends User>(
    app: Application,
    port: number,
    route: string,
    adapters: Adapters<U>
) {
    app.use(route, bodyParser());

    for (const provider in adapters) {
        if (adapters[provider]) {
            app.use(route, adapters[provider].webhook);
        }
    }

    app.listen(port);
}
