/**
 * ebony-framework
 * 
 * @module routers/PostbackRouter
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */
const BasicRouter = require('./BasicRouter');

/**
 * A Postback Router
 */
class PostbackRouter {

    /**
     * Create a PostbackRouter
     */
    constructor() {
        this.stringPayloadRoutes = new BasicRouter();
        this.objectPayloadRoutes = new BasicRouter();
    }

    /**
     * Add routes to the bot
     * @param {object} routes - The routes to be added
     * @returns {void}
     */
    importRoutes({ stringPayloads = {}, objectPayloads = {} }) {
        this.stringPayloadRoutes.importRoutes(stringPayloads);
        this.objectPayloadRoutes.importRoutes(objectPayloads);
    }

    // Router Methods

    stringPayloadHandler(messaging, payload, user) {
        const id = messaging.sender.id;
        const func = this.stringPayloadRoutes.getRoute(payload);
        if (func)
            return func(id, user);

        return this.objectPayloadHandler(messaging, payload, user);
    }

    objectPayloadHandler(messaging, payload, user) {
        try {
            const parsedPayload = JSON.parse(payload);
            const id = messaging.sender.id;
            const func = this.objectPayloadRoutes.getRoute(parsedPayload.type);
            if (func)
                return func(id, user, parsedPayload);

            throw new Error(`Unknown payload: ${payload}`);
        } catch (err) {
            if (err instanceof SyntaxError)
                throw new Error(`[objectPayloadHandler] Payload: ${payload} is not JSON`);

            throw err;
        }
    }

}

module.exports = PostbackRouter;
