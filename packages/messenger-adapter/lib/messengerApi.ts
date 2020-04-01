import { SendAPIBody, UserDataFields } from './adapter/interfaces/messengerAPI';
import fetch from 'node-fetch';

const fbApiUrl = 'https://graph.facebook.com';
const fbApiVersion = 'v6.0';

function wait(millis: number) {
    return new Promise((resolve) => setTimeout(() => resolve, millis));
}

export async function sendAPI(
    body: SendAPIBody,
    qs: string,
    other: { delay: number } = { delay: 0 }
) {
    if (other.delay > 0) {
        await wait(other.delay);
    }
    try {
        const rsp = await fetch(`${fbApiUrl}/me/messages?${qs}`, {
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

export async function getUserDataCall(id: string, fields: UserDataFields[], qs: string) {
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
    targetAppId: string = '263902037430900',
    metadata?: string
) {
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
