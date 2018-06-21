/**
 * ebony-framework
 * 
 * @module routers/ContextRouter
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

const _ = require('lodash');

const BasicRouter = require('./BasicRouter');

/**
* @typedef {Object} ContextRouterOptions
* @property {string} field
* @property {function} fallback
*/

/**
 * A ContextRouter
 * @extends BasicRouter
 */
class ContextRouter extends BasicRouter {

    /**
     * Create a ContextRouter
     * @param {ContextRouterOptions} options - The options of this ContextRouter
     */
    constructor({ field = '', fallback = () => Promise.resolve() }) {
        super();

        this.field = field;
        this.fallback = fallback;
    }

    /**
     * 
     * @param {string} id - The id of the user
     * @param {User} user - The User Object
     * @param {...*} params - Various parameters passed to the action
     * @returns {*|boolean} - The result of the action if the route is found. Else it returns false
     */
    getContextRoute(id, user, ...params) {
        const step = _.get(user, this.field);
        const func = this.getRoute(step);
        if (func)
            return func(id, user, ...params);

        return false;
    }

}

module.exports = ContextRouter;
