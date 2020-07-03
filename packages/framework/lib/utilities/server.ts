import { Application } from 'express';
import bodyParser = require('body-parser');
import { GenericAdapter, User } from '..';

export function start<U extends User>(
    app: Application,
    port: number,
    route: string,
    adapter: GenericAdapter<U>
) {
    app.use(route, bodyParser());
    app.use(route, adapter.webhook);
    app.listen(port);
}
