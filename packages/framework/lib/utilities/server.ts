import { Application } from 'express';
import bodyParser from 'body-parser';
import { GenericAdapter, User } from '..';

export function start<U extends User>(
    app: Application,
    port: number,
    route: string,
    adapter: GenericAdapter<U>
) {
    app.use(route, bodyParser.json());
    app.use(route, adapter.webhook);
    app.listen(port);
}