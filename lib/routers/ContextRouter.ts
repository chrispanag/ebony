/**
 * ebony-framework
 *
 * @module routers/ContextRouter
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import { get } from 'lodash';

import User from '../models/User';
import BasicRouter from './BasicRouter';

/**
 * A ContextRouter
 * @extends BasicRouter
 */
export default class ContextRouter extends BasicRouter {

    private field: string;
    private fallback: (...params: any) => Promise<any>;
    /**
     * Create a ContextRouter
     * @param {ContextRouterOptions} options - The options of this ContextRouter
     */
    constructor({ field = 'context', fallback = () => Promise.resolve() }) {
        super();

        this.field = field;
        this.fallback = fallback;
    }

    /**
     *
     * @param {User} user - The User Object
     * @param {...*} params - Various parameters passed to the action
     * @returns {*|boolean} - The result of the action if the route is found. Else it returns false
     */
    public getContextRoute(user: User, ...params: any[]) {
        const step = get(user, this.field);
        const func = this.getRoute(step);
        if (func) {
            return func(user.id, user, ...params);
        }

        return false;
    }

}
