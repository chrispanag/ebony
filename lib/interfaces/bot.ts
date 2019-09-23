import { GenericAdapter } from "..";
import { ActionMiddleware } from "../utilities/actions";

export interface BotOptions {
    defaultActions: any[];
    userModelFactory: any;
    preSendMiddlewares: ActionMiddleware[];
    postSendMiddlewares: ActionMiddleware[];
    mongodbUri: string;
}

export interface Scenario {
    adapter: GenericAdapter<any>;
    id: string;
    _actions: Action[];
    types: () => Scenario;
    typeAndWait: (millis: number) => Scenario;
    wait: (millis: number) => Scenario;
    end: () => Promise<void>;
    send: (message: any, options?: any) => Scenario;
    handover: (...params: any) => Scenario;
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