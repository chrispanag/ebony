/**
 * ebony-framework
 *
 * @module routers/PostbackRouter
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2020 Christos Panagiotakopoulos
 * @license MIT
 *
 */
import BasicRouter from './BasicRouter';
import User from '../models/User';
import { IUser } from '../models/UserSchema';

export interface PostbackRoutes<T extends User<any>> {
    stringPayloads?: {
        [key: string]: (user: T, payload?: string) => Promise<any>;
    };
    objectPayloads?: {
        [key: string]: (user: T, payload: any) => Promise<any>;
    };
}

/**
 * A Postback Router
 */
export default class PostbackRouter {
    private stringPayloadRoutes = new BasicRouter();
    private objectPayloadRoutes = new BasicRouter();

    /**
     * Add routes to the bot
     */
    public importRoutes<U extends User<any>>({
        stringPayloads = {},
        objectPayloads = {}
    }: PostbackRoutes<U>) {
        this.stringPayloadRoutes.importRoutes(stringPayloads);
        this.objectPayloadRoutes.importRoutes(objectPayloads);
    }

    // Router Methods

    public stringPayloadHandler<U>(payload: string, user: U) {
        const func = this.stringPayloadRoutes.getRoute(payload);
        if (func) {
            return func(user);
        }

        return this.objectPayloadHandler(payload, user);
    }

    public objectPayloadHandler<U>(payload: string, user: U) {
        try {
            const parsedPayload = JSON.parse(payload) as { type: string };
            const func = this.objectPayloadRoutes.getRoute(parsedPayload.type);
            if (func) {
                return func(user, parsedPayload);
            }
            const defaultFunc = this.objectPayloadRoutes.getRoute('default');
            if (defaultFunc) {
                return defaultFunc(user, parsedPayload);
            }

            throw new Error(`Unknown payload: ${payload}`);
        } catch (err) {
            if (err instanceof SyntaxError) {
                throw new Error(`[objectPayloadHandler] Payload: ${payload} is not JSON`);
            }

            throw err;
        }
    }
}
