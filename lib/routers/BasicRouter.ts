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
export default class BasicRouter {
    private routes: { [key: string]: any }

    constructor() {
        this.routes = {};
    }

    /**
     * Adds routes to this router
     * @param {Routes} routes - The routes to be added
     * @returns {void}
     */
    importRoutes(routes = {}) {
        this.routes = Object.assign(routes, this.routes);
    }

    /**
     * Checks if the route exists and if yes returns the function. If it doesn't exist it returns false
     * @param {string} route - The route to be searched
     * @returns {function|boolean} - Returns the function if the route is found, returns false elsewhere
     */
    getRoute(route: string) {
        if (route in this.routes) {
            return this.routes[route];
        }

        return false;
    }
}