/**
 * ebony-framework
 *
 * @module sendAPI/sender
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2020 Christos Panagiotakopoulos
 * @license MIT
 *
 */
import { ISerializable } from '@ebenos/framework';

import { SendAPIBody, UserDataFields } from './interfaces/messengerAPI';
import { MessagingOptions } from './interfaces/messengerAPI';
import { sendAPI, getUserDataCall, passThreadControl } from '../messengerApi';
/**
 * Creates a sender function
 */
export function senderFactory(
    pageToken: string,
    call: (body: SendAPIBody, ...params: any[]) => Promise<any> = sendAPI
) {
    const qs = `access_token=${encodeURIComponent(pageToken)}`;

    /**
     * Sends a message to the user with the id
     */
    function send<T extends MessagingOptions>(id: string, message: ISerializable, options: Partial<T> = {}) {
        const { tag = null, notification_type = 'REGULAR', type = 'RESPONSE', ...other } = options;

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
        return call(body, qs, other);
    }

    function senderAction(id: string, action: string) {
        const body = {
            recipient: { id },
            sender_action: action
        };

        return call(body, qs);
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
