import { Scenario } from '../interfaces/bot';
import GenericAdapter from '../adapter';
import User from '../models/User';
import { IInteraction } from '../interfaces/interactions';

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
        seen,
        stopTyping,
        notify
        // handover
    };

    return scenarios;
}

function notify<A extends GenericAdapter<U>, U extends User>(
    this: Scenario<A, U>,
    ...params: [string, ...any[]]
) {
    this._actions.push({
        call: 'notify',
        params: [...params]
    });

    return this;
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
        const actions = processScenario(this._actions);
        await this.adapter.sender(actions, 'ORDERED');
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
        call: 'message',
        params: [this.id, message, options]
    });
    return this;
}

function types<A extends GenericAdapter<U>, U extends User>(this: Scenario<A, U>) {
    this._actions.push({
        call: 'typing_on',
        params: [this.id]
    });
    return this;
}

function seen<A extends GenericAdapter<U>, U extends User>(this: Scenario<A, U>) {
    this._actions.push({
        call: 'mark_seen',
        params: [this.id]
    });
    return this;
}

function stopTyping<A extends GenericAdapter<U>, U extends User>(this: Scenario<A, U>) {
    this._actions.push({
        call: 'typing_off',
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

function processScenario<U extends User>(actions: Scenario<GenericAdapter<U>, U>['_actions']) {
    let waiter = 0;
    const messages: Array<IInteraction<any>> = [];
    for (const action of actions) {
        const { call, params } = action;
        switch (call) {
            case 'wait':
                waiter += params[0];
                continue;
            case 'message':
                messages.push({
                    type: 'message',
                    id: params[0],
                    message: params[1],
                    options: {
                        ...params[2],
                        delay: waiter
                    }
                });
                waiter = 0;
                continue;
            case 'typing_on':
                messages.push({
                    type: 'typing_on',
                    id: params[0],
                    options: {
                        delay: waiter
                    }
                });
                waiter = 0;
                continue;
            case 'typing_off':
                messages.push({
                    type: 'typing_off',
                    id: params[0],
                    options: {
                        delay: waiter
                    }
                });
                waiter = 0;
                continue;
            case 'mark_seen':
                messages.push({
                    type: 'mark_seen',
                    id: params[0],
                    options: {
                        delay: waiter
                    }
                });
                waiter = 0;
                continue;
            case 'notify':
                messages.push({
                    type: 'notify',
                    notifyData: params[0],
                    options: {
                        delay: waiter
                    }
                });
                waiter = 0;
                continue;
        }
    }

    return messages;
}
