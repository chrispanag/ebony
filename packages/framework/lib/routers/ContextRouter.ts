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

    /**
     * Create a ContextRouter
     * @param options - The options of this ContextRouter
     */
    constructor({ field = 'context' }) {
        super();

        this.field = field;
    }

    /**
     *
     * @param user - The User Object
     * @param params - Various parameters passed to the action
     * @returns The result of the action if the route is found. Else it returns false
     */
    public getContextRoute<U extends User = User>(user: U, ...params: any[]) {
        if (!(this.field in user)) {
            throw new Error(`User doesn't have the property: ${this.field}`);
        }

        const step = get(user, this.field);
        const func = this.getRoute(step);
        if (func) {
            return func(user.id, user, ...params);
        }

        return false;
    }
}
