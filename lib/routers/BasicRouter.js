/*!
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

class BasicRouter {
    constructor() {
        this.routes = {};
    }

    importRoutes(routes = {}) {
        this.routes = Object.assign(routes, this.routes);
    }

    getRoute(route) {
        if (route in this.routes)
            return this.routes[route];

        return false;
    }
}

module.exports = BasicRouter;
