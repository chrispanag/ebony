import { GenericAdapter, User } from '..';
import { ActionMiddleware } from '../utilities/actions';
export interface BotOptions<T extends User<any>> {
    preSendMiddlewares?: Array<ActionMiddleware<T>>;
    postSendMiddlewares?: Array<ActionMiddleware<T>>;
}

export interface Scenario<A extends GenericAdapter> {
    adapter: A;
    id: string;
    _consolidated: boolean;
    _actions: Action[];
    types: () => Scenario<A>;
    typeAndWait: (millis: number) => Scenario<A>;
    wait: (millis: number) => Scenario<A>;
    end: () => Promise<void>;
    send: (message: any, options?: any) => Scenario<A>;
    seen: () => Scenario<A>;
    stopTyping: () => Scenario<A>;
    notify: (...params: any[]) => Scenario<A>;
}

export interface Action {
    call: 'message' | 'wait' | 'typing_on' | 'typing_off' | 'mark_seen' | 'handover' | 'notify';
    params: any[];
}

export interface Module<T extends User<any>> {
    routes?: { stringPayloads: Record<string, string>; objectPayloads: Record<string, string> };
    actions?: { [key: string]: (user: T, ...params: any) => Promise<any> };
    intents?: { [key: string]: (user: T, ...params: any) => Promise<any> };
    referrals?: { [key: string]: (user: T, ...params: any) => Promise<any> };
    text?: Array<{ regex: RegExp; action: string }>;
    preMiddlewares?: Array<ActionMiddleware<T>>;
    postMiddlewares?: Array<ActionMiddleware<T>>;
    nlp?: (...params: any) => Promise<any>;
    name: string;
}

export interface TextRule<T> {
    regex: RegExp;
    action: (user: T, ...params: any) => Promise<any>;
}
