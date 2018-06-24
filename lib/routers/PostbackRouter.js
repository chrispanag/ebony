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
        this.menuRoutes = new BasicRouter();
        this.withoutDataRoutes = new BasicRouter();
        this.withDataRoutes = new BasicRouter();
    }

    /**
     * Add routes to the bot
     * @param {object} routes - The routes to be added
     * @returns {void}
     */
    importRoutes({ menu = {}, withoutData = {}, withData = {} }) {
        this.menuRoutes.importRoutes(menu);
        this.withoutDataRoutes.importRoutes(withoutData);
        this.withDataRoutes.importRoutes(withData);
    }

    // Router Methods

    stringPayloadHandler(messaging, payload, user) {
        const id = messaging.sender.id;
        const func = this.menuRoutes.getRoute(payload);
        if (func)
            return func(id, user);

        return this.objectPayloadHandler(messaging, payload, user);
    }

    objectPayloadHandler(messaging, payload, user) {
        try {
            const parsedPayload = JSON.parse(payload);
            const id = messaging.sender.id;
            const func = this.withDataRoutes.getRoute(parsedPayload.type);
            if (func)
                return func(id, user, payload);

            throw new Error(`Unknown payload: ${payload}`);
        } catch (err) {
            if (err instanceof SyntaxError)
                throw new Error(`[objectPayloadHandler] Payload: ${payload} is not JSON`);

            throw err;
        }
    }

}

module.exports = PostbackRouter;
