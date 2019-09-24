import { GenericAdapter, User } from "..";
import { ActionMiddleware } from "../utilities/actions";

export interface BotOptions {
    defaultActions?: any[];
    userModelFactory?: any;
    preSendMiddlewares?: ActionMiddleware[];
    postSendMiddlewares?: ActionMiddleware[];
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

export interface Module {
    routes?: { [key: string]: any };
    actions?: { [key: string]: any };
    intents?: { [key: string]: any };
    referrals?: { [key: string]: any };
    text?: any[];
    preMiddlewares?: ActionMiddleware[];
    postMiddlewares?: ActionMiddleware[];
    nlp?: (...params: any) => any;
}