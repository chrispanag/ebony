/**
 * ebony-framework
 * 
 * @module routers/BasicRouter
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

 /**
  * @typedef {Object.<string, function>} Routes
  */

 /**
  * A Basic Router Class
  */
class BasicRouter {
    constructor(defaultFunction = null) {
        this.routes = {};
        this.defaultFunction = defaultFunction;
    }

    defaultAction(route) {
        return (id, user) => this.defaultFunction(id, user, route);
    }

    /**
     * Adds routes to this router
     * @param {Routes} routes - The routes to be added
     * @returns {void}
     */
    importRoutes(routes = {}) {
        this.routes = Object.assign(routes, this.routes);

        if ('default' in this.routes) {
            this.defaultFunction = this.routes.default;
        }
    }

    /**
     * Checks if the route exists and if yes returns the function. If it doesn't exist it returns false
     * @param {string} route - The route to be searched
     * @returns {function|boolean} - Returns the function if the route is found, returns false elsewhere
     */
    getRoute(route) {
        if (route in this.routes) {
            return this.routes[route];
        }

        if (this.defaultFunction) {
            return this.defaultAction(route);
        }

        return false;
    }
}

module.exports = BasicRouter;
