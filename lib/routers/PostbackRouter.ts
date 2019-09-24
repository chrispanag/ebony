/**
 * ebony-framework
 *
 * @module routers/PostbackRouter
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */
import BasicRouter from './BasicRouter';
import User from '../models/User';

/**
 * A Postback Router
 */
export default class PostbackRouter {

    private stringPayloadRoutes = new BasicRouter();
    private objectPayloadRoutes = new BasicRouter();

    /**
     * Add routes to the bot
     * @param {object} routes - The routes to be added
     * @returns {void}
     */
    public importRoutes({ stringPayloads = {}, objectPayloads = {} }) {
        this.stringPayloadRoutes.importRoutes(stringPayloads);
        this.objectPayloadRoutes.importRoutes(objectPayloads);
    }

    // Router Methods

    public stringPayloadHandler<U extends User>(messaging: any, payload: string, user: U) {
        const func = this.stringPayloadRoutes.getRoute(payload);
        if (func) {
            return func(user);
        }

        return this.objectPayloadHandler(messaging, payload, user);
    }

    public objectPayloadHandler<U extends User>(messaging: any, payload: string, user: U) {
        try {
            const parsedPayload = JSON.parse(payload) as { type: string };
            const func = this.objectPayloadRoutes.getRoute(parsedPayload.type);
            if (func) {
                return func(user, parsedPayload);
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