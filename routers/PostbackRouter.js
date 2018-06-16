const BasicRouter = require('./BasicRouter');

class PostbackRouter {
    constructor() {
        this.menuRoutes = new BasicRouter();
        this.withoutDataRoutes = new BasicRouter();
        this.withDataRoutes = new BasicRouter();
    }

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
        const parsedPayload = JSON.parse(payload);

        const id = messaging.sender.id;
        const func = this.withoutDataRoutes.getRoute(parsedPayload);
        if (func)
            return func(id, user);

        return this.payloadWithData(messaging, parsedPayload, user);
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
