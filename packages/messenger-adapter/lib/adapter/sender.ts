/**
 * ebony-framework
 *
 * @module sendAPI/sender
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import { Message } from '../sendAPI/message';
import { SendAPIBody, UserDataFields } from './interfaces/messengerAPI';
import { MessagingOptions } from '../sendAPI/interfaces';
import fetch from 'node-fetch';

/**
 * @typedef {object} MessagingOptions
 * @property {?string} tag - The messaging tag used to send the message
 * @property {?string} notification_type - The notification type of the message
 * @property {?type} type - The type of the message
 */

const fbApiUrl = 'https://graph.facebook.com';
const fbApiVersion = 'v2.11';

/**
 * Creates a sender function
 */
export function senderFactory(
    pageToken: string,
    sendAPI: (body: SendAPIBody, ...params: any[]) => Promise<any> = sendAPIRequest
) {
    const qs = `access_token=${encodeURIComponent(pageToken)}`;

    /**
     * Sends a message to the user with the id
     */
    function send(id: string, message: Message, options: MessagingOptions = {}) {
        const { tag = null, notification_type = 'REGULAR', type = 'RESPONSE' } = options;

        if (!id) {
            throw new Error('[Error] Send: No user id is specified!');
        }

        if (!message) {
            throw new Error('[Error] No message passed!');
        }

        let messaging_type = type;
        if (tag) {
            messaging_type = 'MESSAGE_TAG';
        }

        const body = {
            recipient: { id },
            message: message.serialize(),
            notification_type,
            messaging_type
        };

        // TODO implement logger in here.
        return sendAPI(body, qs);
    }

    function senderAction(id: string, action: string) {
        const body = {
            recipient: { id },
            sender_action: action
        };

        return sendAPI(body, qs);
    }

    function getUserData(id: string, fields: UserDataFields[]) {
        return getUserDataCall(id, fields, qs);
    }

    function handover(id: string, targetAppId: string = '263902037430900', metadata?: string) {
        return passThreadControl(id, qs, targetAppId, metadata);
    }

    return {
        send,
        senderAction,
        getUserData,
        handover
    };
}

async function sendAPIRequest(body: SendAPIBody, qs: string) {
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

async function getUserDataCall(id: string, fields: UserDataFields[], qs: string) {
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

async function passThreadControl(
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
