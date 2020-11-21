import { Application } from 'express';
import bodyParser from 'body-parser';
import { GenericAdapter } from '..';

export function start(app: Application, port: number, route: string, adapter: GenericAdapter) {
    app.use(route, bodyParser.json());
    app.use(route, adapter.webhook);
    app.listen(port);
}
