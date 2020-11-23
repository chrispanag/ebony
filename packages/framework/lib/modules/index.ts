import User from '../models/User';
import { Module } from '../interfaces/bot';
import Bot from '../bot';

export function createModule<U extends User<any>>(name = 'global', bot: Bot<U>) {
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
        name,
        bot
    };

    return module;
}

export function addAction<U extends User<any>>(
    module: Module<U>,
    action: (user: U) => Promise<any>
) {
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
    action: (user: U, payload: any) => Promise<any>,
    type: 'string' | 'object'
) {
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
    const bot = module.bot;
    category[actionName] = (user: U, payload?: string) =>
        bot.actions.exec(actionName, user, payload);

    if (type === 'string') {
        return actionName;
    }

    return { type: actionName };
}
