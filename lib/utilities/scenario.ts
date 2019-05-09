import { Scenario } from "../botInterfaces";
import { GenericAdapter } from "../index";

export default function createScenario(id: string, adapter: GenericAdapter<any>) {
    const scenarios: Scenario = {
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

function handover(this: Scenario): Scenario {
    this._actions.push({
        call: 'handover',
        params: [this.id]
    });

    return this;
}

async function end(this: Scenario): Promise<void> {
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

function wait(this: Scenario, millis: number) {
    this._actions.push({
        call: 'wait',
        params: [millis]
    });
    return this;
}

function send(this: Scenario, message: any, options: any = {}) {
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

function types(this: Scenario) {
    this._actions.push({
        call: 'startsTyping',
        params: [this.id]
    });
    return this;
}

function typeAndWait(this: Scenario, millis: number) {
    this.types();
    this.wait(millis);
    return this;
}