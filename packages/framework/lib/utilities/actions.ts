/**
 * ebony-framework
 *
 * @module utilities/actions
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2020 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import User from '../models/User';
import { IUser } from '../models/UserSchema';

type Action<U extends User<any>> = (user: U, ...params: any) => Promise<any>;

interface ActionsStore<U extends User<any>> {
    [key: string]: Action<U>;
}

export type ActionMiddleware<U extends User<any>> = (
    actionName: string,
    user: U,
    params: any[],
    next: () => any
) => any;

/**
 * The Actions Class
 */
export default class Actions<U extends User<any>> {
    private actions: ActionsStore<U> = {};
    private preMiddlewares: Array<ActionMiddleware<U>> = [];
    private postMiddlewares: Array<ActionMiddleware<U>> = [];

    constructor(
        preMiddlewares: Array<ActionMiddleware<U>> = [],
        postMiddlewares: Array<ActionMiddleware<U>> = []
    ) {
        this.preMiddlewares = preMiddlewares;
        this.postMiddlewares = postMiddlewares;
    }

    public addMiddleware(type: 'pre' | 'post', middleware: ActionMiddleware<U>) {
        switch (type) {
            case 'pre':
                this.preMiddlewares.push(middleware);
                return;
            case 'post':
                this.postMiddlewares.push(middleware);
                return;
        }
    }

    public addMiddlewares(type: 'pre' | 'post', middlewares: Array<ActionMiddleware<U>>) {
        switch (type) {
            case 'pre':
                this.preMiddlewares = this.preMiddlewares.concat(middlewares);
                return;
            case 'post':
                this.postMiddlewares = this.postMiddlewares.concat(middlewares);
                return;
        }
    }

    /**
     * Adds actions to the bot
     */
    public importActions(actions: ActionsStore<U> = {}) {
        this.actions = Object.assign(this.actions, actions);
    }

    private nextFactory(type: 'pre' | 'post', actionName: string, user: U, params: any[]) {
        const actions = this.actions;
        const middlewares = type === 'pre' ? this.preMiddlewares : this.postMiddlewares;

        let i = 0;

        const next = async () => {
            try {
                if (middlewares.length <= i) {
                    if (type === 'pre') {
                        await actions[actionName](user, ...params);
                    }
                    return;
                }

                i = i + 1;
                await middlewares[i - 1](actionName, user, params, next);
                return;
            } catch (err) {
                throw err;
            }
        };

        return next;
    }

    /**
     * Executes an action
     */
    public async exec(actionName: string, user: U, ...params: any) {
        if (actionName in this.actions) {
            const preNext = this.nextFactory('pre', actionName, user, params);
            const postNext = this.nextFactory('post', actionName, user, params);

            try {
                await preNext();
            } catch (err) {
                throw err;
            } finally {
                postNext();
            }

            return;
        }

        throw new Error(`[Error] Action with name: ${actionName} doesn't exist!`);
    }
}
