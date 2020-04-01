import { Scenario } from '../interfaces/bot';
import GenericAdapter from '../adapter';
import User from '../models/User';

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

function handover<A extends GenericAdapter<U>, U extends User>(
    this: Scenario<A, U>,
    ...params: [string, ...any[]]
) {
    this._actions.push({
        call: 'handover',
        params: [this.id, ...params]
    });

    return this;
}

async function end<A extends GenericAdapter<U>, U extends User>(
    this: Scenario<A, U>
): Promise<void> {
    try {
        let waiter = 0;
        for (const action of this._actions) {
            const { call, params } = action;
            switch (call) {
                case 'handover':
                    await this.adapter.handover(...params as [string, ...any[]]);
                    continue;
                case 'wait':
                    waiter += params[0];
                    continue;
                case 'sender':
                    params[2].delay = waiter;
                    await this.adapter.sender(...params as [string, any, any]);
                    waiter = 0;
                    continue;
                case 'startsTyping':
                    await this.adapter.startsTyping(...params as [string]);
                    continue;
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

function send<A extends GenericAdapter<U>, U extends User>(
    this: Scenario<A, U>,
    message: any,
    options: any = {}
) {
    this._actions.push({
        call: 'sender',
        params: [this.id, message, options]
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

function typeAndWait<A extends GenericAdapter<U>, U extends User>(
    this: Scenario<A, U>,
    millis: number
) {
    this.types();
    this.wait(millis);
    return this;
}
