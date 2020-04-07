/**
 * ebony-framework
 *
 * @module sendAPI/sender
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2020 Christos Panagiotakopoulos
 * @license MIT
 *
 */
import { IBaseMessage, IBaseMessageOptions } from '@ebenos/framework';

import { SendAPIBody, UserDataFields } from './interfaces/messengerAPI';
import { MessagingOptions } from './interfaces/messengerAPI';
import { sendAPI, getUserDataCall, passThreadControl } from '../messengerApi';

export type IBaseFbMessageOptions = MessagingOptions & IBaseMessageOptions;

export type IMessage<MessageOptions extends IBaseFbMessageOptions> = IBaseMessage<MessageOptions>;

export type SendedMessage<T extends IBaseFbMessageOptions> = {
    body?: SendAPIBody;
    token?: string;
    notifyUrl?: string;
    notifyData?: string;
} & Partial<Omit<T, 'tag' | 'notification_type' | 'type'>>;

export type SenderFunction<T extends IBaseFbMessageOptions> = (
    actions: Array<SendedMessage<T>>,
    type: 'ORDERED' | 'UNORDERED',
    token: string
) => Promise<any>;
/**
 * Creates a sender function
 */
export function senderFactory<T extends IBaseFbMessageOptions>(
    pageToken: string,
    call: SenderFunction<T> = sendAPI
) {
    const qs = `access_token=${encodeURIComponent(pageToken)}`;

    function createMessageBody(message: Omit<IMessage<T>, 'type'>): SendedMessage<T> {
        if (message.options === undefined) {
            throw new Error("Options can't be undefined!");
        }
        if (message.message === undefined) {
            throw new Error("Message can't be undefined!");
        }
        const {
            tag = null,
            notification_type = 'REGULAR',
            type = 'RESPONSE',
            ...other
        } = message.options;

        if (!message.id) {
            throw new Error('[Error] Send: No user id is specified!');
        }

        if (!message.message) {
            throw new Error('[Error] No message passed!');
        }

        let messaging_type = type;
        if (tag) {
            messaging_type = 'MESSAGE_TAG';
        }

        const body = {
            recipient: { id: message.id },
            message: message.message.serialize(),
            notification_type,
            messaging_type,
            tag
        };

        return { body, token: qs, ...other };
    }
    /**
     * Sends a message to the user with the id
     */
    function send(actions: Array<IMessage<T>>, orderType: 'ORDERED' | 'UNORDERED') {
        const bodies = actions.map(({ type: messageType, ...other }): SendedMessage<T> => {
            if (other.options === undefined) {
                other.options = {};
            }
            const { notification_type, tag, type, ...options } = other.options;
            switch (messageType) {
                case 'message':
                    return createMessageBody(other);
                case 'typing_on':
                    return {
                        body: {
                            recipient: { id: other.id },
                            sender_action: messageType
                        },
                        ...options
                    };
                case 'typing_off':
                    return {
                        body: {
                            recipient: { id: other.id },
                            sender_action: messageType
                        },
                        ...options
                    };
                case 'mark_seen':
                    return {
                        body: {
                            recipient: { id: other.id },
                            sender_action: messageType
                        },
                        ...options
                    };
                case 'notify':
                    return {
                        ...options
                    };
                default:
                    throw new Error('Unknown type!');
            }
        });

        // TODO implement logger in here.
        return call(bodies, orderType, qs);
    }

    function senderAction(id: string, action: string, other: Partial<T> = {}) {
        const body = {
            recipient: { id },
            sender_action: action
        };

        return call([{ body, ...other }], 'ORDERED', qs);
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
