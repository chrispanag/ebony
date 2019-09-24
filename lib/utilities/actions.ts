/**
 * ebony-framework
 *
 * @module utilities/actions
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import User from "../models/User";

type Action<T extends User> = (user: T, ...params: any) => Promise<any>;

interface ActionsStore<T extends User> {
    [key: string]: Action<T>;
}

export type ActionMiddleware<T extends User> = (actionName: string, user: T, params: any[], next: () => any) => any;

/**
 * The Actions Class
 */
export default class Actions<T extends User> {

    /**
     * Creates an Actions Instance
     * @param {ActionsOptions} options - The options of the actions
     */

    private actions: ActionsStore<T> = {};
    private preMiddlewares: Array<ActionMiddleware<T>> = [];
    private postMiddlewares: Array<ActionMiddleware<T>> = [];

    constructor(preMiddlewares: Array<ActionMiddleware<T>> = [], postMiddlewares: Array<ActionMiddleware<T>> = []) {
        this.preMiddlewares = preMiddlewares;
        this.postMiddlewares = postMiddlewares;
    }

    public addMiddleware(type: 'pre' | 'post', middleware: ActionMiddleware<T>) {
        switch (type) {
            case 'pre':
                this.preMiddlewares.push(middleware);
                return;
            case 'post':
                this.postMiddlewares.push(middleware);
                return;
        }
    }

    public addMiddlewares(type: 'pre' | 'post', middlewares: Array<ActionMiddleware<T>>) {
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
    public importActions(actions: ActionsStore<T> = {}) {
        this.actions = Object.assign(this.actions, actions);
    }

    private nextFactory(type: 'pre' | 'post', actionName: string, user: T, params: any[]) {
        const actions = this.actions;
        const middlewares = type === 'pre' ? this.preMiddlewares : this.postMiddlewares;

        let i = 0;

        const next = () => {
            if (middlewares.length <= i) {
                if (type === 'pre') {
                    actions[actionName](user, ...params);
                }
                return;
            }

            i = i + 1;
            middlewares[i - 1](actionName, user, params, next);
            return;
        };

        return next;
    }

    /**
     * Executes an action
     */
    public exec(actionName: string, user: T, ...params: any) {
        if (actionName in this.actions) {
            const preNext = this.nextFactory('pre', actionName, user, params);
            const postNext = this.nextFactory('post', actionName, user, params);

            preNext();
            postNext();
            return;
        }

        throw new Error(`[Error] Action with name: ${actionName} doesn't exist!`);
    }

}
