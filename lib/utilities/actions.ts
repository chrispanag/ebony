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

type Action = (user: User, ...params: any) => Promise<any>;

interface ActionsStore {
    [key: string]: Action;
}

export type ActionMiddleware = (actionName: string, user: User, params: any[], next?: () => any) => any;

/**
 * The Actions Class
 */
export default class Actions {

    /**
     * Creates an Actions Instance
     * @param {ActionsOptions} options - The options of the actions
     */

    private actions: ActionsStore = {};
    private preMiddlewares: ActionMiddleware[] = [];
    private postMiddlewares: ActionMiddleware[] = [];

    constructor(preMiddlewares = [], postMiddlewares = []) {
        this.preMiddlewares = preMiddlewares;
        this.postMiddlewares = postMiddlewares;
    }

    public addMiddleware(type: 'pre' | 'post', middleware: ActionMiddleware) {
        switch (type) {
            case 'pre': this.preMiddlewares.push(middleware); return;
            case 'post': this.postMiddlewares.push(middleware); return;
        }
    }

    public addMiddlewares(type: 'pre' | 'post', middlewares: ActionMiddleware[]) {
        switch (type) {
            case 'pre': this.preMiddlewares.concat(middlewares); return;
            case 'post': this.postMiddlewares.concat(middlewares); return;
        }
    }

    /**
     * Adds actions to the bot
     */
    public importActions(actions: ActionsStore = {}) {
        this.actions = Object.assign(this.actions, actions);
    }

    private nextFactory(type: 'pre' | 'post', actionName: string, user: User, params: any[]) {
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
    public exec(actionName: string, user: User, ...params: any) {
        if (actionName in this.actions) {
            const preNext = this.nextFactory('pre', actionName, user, params);
            const postNext = this.nextFactory('post', actionName, user, params);

            preNext();
            postNext();
        }

        throw new Error(`[Error] Action with name: ${actionName} doesn't exist!`);
    }

}
