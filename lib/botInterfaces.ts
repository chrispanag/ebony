import { GenericAdapter } from "./index";

export interface Scenario {
    adapter: GenericAdapter<any>
    id: string;
    _actions: Action[];
    types: () => Scenario;
    typeAndWait: (millis: number) => Scenario;
    wait: (millis: number) => Scenario;
    end: () => Promise<void>;
    send: (message: any, options?: any) => Scenario;
    handover: (id: string, ...params: any) => Scenario;
}

export interface Action {
    call: string;
    params: any[]
}

export interface Module {
    routes?: { [key: string]: any },
    actions?: { [key: string]: any },
    intents?: { [key: string]: any },
    referrals?: { [key: string]: any },
    text?: any[]
}