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

    menuRouter(messaging, payload, user) {
        const id = messaging.sender.id;
        const func = this.menuRoutes.getRoute(payload);
        if (func)
            return func(id, user);

        return this.payloadWithoutData(messaging, payload, user);
    }

    payloadWithoutData(messaging, payload, user) {
        try {
            const parsedPayload = JSON.parse(payload);

            const id = messaging.sender.id;
            const func = this.withoutDataRoutes.getRoute(parsedPayload);
            if (func)
                return func(id, user);

            return this.payloadWithData(messaging, parsedPayload, user);
        } catch (err) {
            if (err instanceof SyntaxError)
                throw new Error(`Unknown payload: ${payload}`);

            throw err;
        }
    }

    payloadWithData(messaging, payload, user) {
        const id = messaging.sender.id;
        const func = this.withDataRoutes.getRoute(payload.type);
        if (func)
            return func(id, user, payload);

        throw new Error(`Unknown payload: ${payload}`);
    }

}

module.exports = PostbackRouter;
