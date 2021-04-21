import User from '../models/User';
import { Module } from '../interfaces/bot';

export function createModule<U extends User<any>>(name = 'global'): Module<U> {
    const module: Module<U> = {
        actions: {},
        intents: {},
        routes: {
            stringPayloads: {},
            objectPayloads: {}
        },
        referrals: {},
        text: [],
        preMiddlewares: [],
        postMiddlewares: [],
        name
    };

    return module;
}

export function addAction<U extends User<any>>(
    module: Module<U>,
    action: (user: U, ...args: any[]) => Promise<any>
): void {
    if (module.actions === undefined) {
        module.actions = {};
    }
    const actionName = module.name + '/' + action.name;

    if (actionName in module.actions) {
        throw new Error(`Action with name: '${actionName}', already exists!`);
    }

    module.actions[module.name + '/' + action.name] = action;
}

export function addPostbackRule<U extends User<any>>(
    module: Module<U>,
    action: (user: U, payload?: any, ...args: any[]) => Promise<any>,
    type: 'string' | 'object'
): string | { type: string } {
    const actionName = module.name + '/' + action.name;
    if (module.actions === undefined || !(actionName in module.actions)) {
        throw new Error(`Action with name: '${actionName}', doesn't exist!`);
    }

    if (module.routes === undefined) {
        module.routes = {
            stringPayloads: {},
            objectPayloads: {}
        };
    }

    const categoryName = type === 'string' ? 'stringPayloads' : 'objectPayloads';
    let category = type === 'string' ? module.routes.stringPayloads : module.routes.objectPayloads;
    if (!category) {
        category = {};
        module.routes[categoryName] = category;
    }

    // Here we need to add the bot object (bot.actions.exec...)
    category[actionName] = actionName;

    if (type === 'string') {
        return actionName;
    }

    return { type: actionName };
}

export function addTextRule<U extends User<any>>(
    module: Module<U>,
    action: (user: U, payload?: string, ...args: any[]) => Promise<any>,
    rule: RegExp | RegExp[]
): void {
    const actionName = module.name + '/' + action.name;
    if (module.actions === undefined || !(actionName in module.actions)) {
        throw new Error(`Action with name: '${actionName}', doesn't exist!`);
    }
    if (module.text === undefined) {
        module.text = [];
    }

    if (Array.isArray(rule)) {
        module.text.concat(rule.map((r) => ({ regex: r, action: actionName })));
    } else {
        module.text.push({ regex: rule, action: actionName });
    }
}

export function createPayload<U extends User<any>>(
    module: Module<U>,
    action: (user: U, payload?: any, ...args: any[]) => Promise<any>,
    type: 'string'
): string;
export function createPayload<U extends User<any>>(
    module: Module<U>,
    action: (user: U, payload?: any, ...args: any[]) => Promise<any>,
    type: 'object'
): { type: string };
export function createPayload<T extends Record<string, any>, U extends User<any>>(
    module: Module<U>,
    action: (user: U, payload?: any, ...args: any[]) => Promise<any>,
    type: 'object',
    payloadData: T
): { type: string } & T;
export function createPayload<T extends Record<string, any>, U extends User<any>>(
    module: Module<U>,
    action: (user: U, payload?: any, ...args: any[]) => Promise<any>,
    type: 'string' | 'object' = 'string',
    payloadData?: T
): string | ({ type: string } & T) | { type: string } {
    const actionName = module.name + '/' + action.name;
    if (module.actions === undefined || !(actionName in module.actions)) {
        throw new Error(`Action with name: '${actionName}', doesn't exist!`);
    }

    if (type === 'string') {
        return actionName;
    }

    if (payloadData !== undefined) {
        return { type: actionName, ...payloadData };
    }

    return { type: actionName };
}
