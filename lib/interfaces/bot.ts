import { GenericAdapter, User } from "..";
import { ActionMiddleware } from "../utilities/actions";
import { PostbackRoutes } from "../routers/PostbackRouter";

export interface BotOptions<T extends User> {
    defaultActions?: any[];
    userModelFactory?: any;
    preSendMiddlewares?: Array<ActionMiddleware<T>>;
    postSendMiddlewares?: Array<ActionMiddleware<T>>;
    mongodbUri: string;
}

export interface Scenario<A extends GenericAdapter<U>, U extends User = User> {
    adapter: A;
    id: string;
    _actions: Action[];
    types: () => Scenario<A, U>;
    typeAndWait: (millis: number) => Scenario<A, U>;
    wait: (millis: number) => Scenario<A, U>;
    end: () => Promise<void>;
    send: (message: any, options?: any) => Scenario<A, U>;
    handover: (...params: any) => Scenario<A, U>;
}

export interface Action {
    call: string;
    params: any[];
}

export interface Module<T extends User> {
    routes?: PostbackRoutes<T>;
    actions?: { [key: string]: any };
    intents?: { [key: string]: any };
    referrals?: { [key: string]: any };
    text?: any[];
    preMiddlewares?: Array<ActionMiddleware<T>>;
    postMiddlewares?: Array<ActionMiddleware<T>>;
    nlp?: (...params: any) => Promise<any>;
}