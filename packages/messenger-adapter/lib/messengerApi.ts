import { SendAPIBody, UserDataFields } from './adapter/interfaces/messengerAPI';
import fetch from 'node-fetch';

const fbApiUrl = 'https://graph.facebook.com';
const fbApiVersion = 'v6.0';

function wait(millis: number) {
    return new Promise((resolve) => setTimeout(() => resolve(true), millis));
}

export interface IBaseAction {
    delay?: number;
    schedule?: number;
    priority?: number;
}

export interface IMessageAction extends IBaseAction {
    body: SendAPIBody;
}

export interface INotifyAction extends IBaseAction {
    notifyUrl: string;
    notifyData: string;
}

export type ISendAction = IMessageAction | INotifyAction;

export function isNotifyAction(action: ISendAction): action is INotifyAction {
    const test: any = action;
    return Boolean(test.notifyUrl);
}

export async function sendAPI(
    actions: ISendAction[],
    type: 'ORDERED' | 'UNORDERED',
    token: string
): Promise<any> {
    const results = [];
    console.log(actions);
    for (const action of actions) {
        console.log(action);
        const { delay = 0 } = action;
        if (delay > 0) {
            await wait(delay);
        }
        if (isNotifyAction(action)) {
            // TODO: Find a way
            console.log('Not Implemented');
            continue;
        }
        if (action.body) {
            const rsp = await fetch(`${fbApiUrl}/me/messages?${token}`, {
                body: JSON.stringify(action.body),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await rsp.json();

            if (json.error && json.error.message) {
                console.log(json.error.message);
            }
            results.push(json);
            continue;
        }

        console.log('No body or token!');
    }

    console.log(results);
    return results;
}

export async function getUserDataCall(
    id: string,
    fields: UserDataFields[],
    qs: string
): Promise<any> {
    const query = fields.join(',');
    try {
        const rsp = await fetch(`${fbApiUrl}/${fbApiVersion}/${id}?fields=${query}&${qs}`);
        const json = await rsp.json();

        if (json.error && json.error.message) {
            throw new Error(json.error.message);
        }

        return json;
    } catch (err) {
        // TODO: Handle errors
        throw err;
    }
}

export async function passThreadControl(
    id: string,
    qs: string,
    targetAppId = '263902037430900',
    metadata?: string
): Promise<any> {
    const bodyWithoutMetadata = {
        recipient: {
            id
        },
        target_app_id: targetAppId
    };
    const bodyWithMetadata = Object.assign({ metadata }, bodyWithoutMetadata);

    const body = metadata ? bodyWithMetadata : bodyWithoutMetadata;

    try {
        const rsp = await fetch(`${fbApiUrl}/${fbApiVersion}/me/pass_thread_control?${qs}`, {
            body: JSON.stringify(body),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await rsp.json();

        if (json.error && json.error.message) {
            throw new Error(json.error.message);
        }

        return json;
    } catch (err) {
        // TODO: Handle errors
        throw err;
    }
}
