import { Scenario } from "../interfaces/bot";
import { GenericAdapter, User } from "../index";

export default function createScenario<U extends User>(id: string, adapter: GenericAdapter<U>) {
    const scenarios: Scenario<GenericAdapter<U>, U> = {
        adapter,
        id,
        _actions: [],
        end,
        send,
        wait,
        types,
        typeAndWait,
        handover
    };

    return scenarios;
}

function handover<A extends GenericAdapter<U>, U extends User>(this: Scenario<A, U>, ...params: any) {
    this._actions.push({
        call: 'handover',
        params: [this.id, ...params]
    });

    return this;
}

async function end<A extends GenericAdapter<U>, U extends User>(this: Scenario<A, U>): Promise<void> {
    try {
        for (const action of this._actions) {
            const properties = action.call.split('.');
            let obj: { [key: string]: any } | ((...params: any) => Promise<void>) = this.adapter;
            for (const property of properties) {
                if (typeof obj === 'object') {
                    obj = obj[property] as { [key: string]: any } | ((...params: any) => Promise<void>);
                } else {
                    throw new Error("Issue on scenario.end()");
                }
            }
            if (typeof obj === 'function') {
                await obj(...action.params);
            } else {
                throw new Error("Issue on scenario.end()");
            }
        }
    } catch (err) {
        throw err;
    } finally {
        this._actions = [];
    }
}

function wait<A extends GenericAdapter<U>, U extends User>(this: Scenario<A, U>, millis: number) {
    this._actions.push({
        call: 'wait',
        params: [millis]
    });
    return this;
}

function send<A extends GenericAdapter<U>, U extends User>(this: Scenario<A, U>, message: any, options: any = {}) {
    this._actions.push({
        call: 'sender',
        params: [
            this.id,
            message,
            options
        ]
    });
    return this;
}

function types<A extends GenericAdapter<U>, U extends User>(this: Scenario<A, U>) {
    this._actions.push({
        call: 'startsTyping',
        params: [this.id]
    });
    return this;
}

function typeAndWait<A extends GenericAdapter<U>, U extends User>(this: Scenario<A, U>, millis: number) {
    this.types();
    this.wait(millis);
    return this;
}