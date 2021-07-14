/**
 * ebony-framework
 *
 * @module sendAPI/sender
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2020 Christos Panagiotakopoulos
 * @license MIT
 *
 */
import {
    IBaseMessageOptions,
    IMessageInteraction,
    IInteraction,
    isMessageInteraction,
    isSenderActionInteraction,
    isNotifyInteraction
} from '@ebenos/framework';

import { UserDataFields, MessagingOptions } from './interfaces/messengerAPI';
import { sendAPI, getUserDataCall, passThreadControl, ISendAction } from '../messengerApi';

export type SenderFunction = (
    actions: ISendAction[],
    type: 'ORDERED' | 'UNORDERED',
    token: string
) => Promise<any>;
/**
 * Creates a sender function
 */
export function senderFactory(pageToken: string, call: SenderFunction = sendAPI, DOMAIN?: string) {
    const qs = `access_token=${encodeURIComponent(pageToken)}`;

    function createMessageBody(message: Omit<IMessageInteraction<MessagingOptions>, 'type'>) {
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

        return { body, ...other };
    }
    /**
     * Sends a message to the user with the id
     */
    function send(
        actions: Array<IInteraction<MessagingOptions>>,
        orderType: 'ORDERED' | 'UNORDERED'
    ) {
        const bodies = actions.map((interaction): ISendAction => {
            if (interaction.options === undefined) {
                interaction.options = {};
            }
            if (isMessageInteraction(interaction)) {
                const { type, ...other } = interaction;
                return createMessageBody(other);
            }
            if (isSenderActionInteraction(interaction)) {
                return {
                    body: {
                        recipient: { id: interaction.id },
                        sender_action: interaction.type
                    },
                    ...interaction.options
                };
            }
            if (isNotifyInteraction(interaction)) {
                if (!DOMAIN) {
                    throw new Error('No notifyUrl is set!');
                }
                return {
                    notifyData: interaction.notifyData,
                    notifyUrl: DOMAIN,
                    ...interaction.options
                };
            }

            throw new Error('Unknown type!');
        });
        
        // TODO implement logger in here.
        return call(bodies, orderType, qs);
    }

    function senderAction(id: string, action: string, other: Partial<IBaseMessageOptions> = {}) {
        const body = {
            recipient: { id },
            sender_action: action
        };

        return call([{ body, ...other }], 'ORDERED', qs);
    }

    function getUserData(id: string, fields: UserDataFields[]) {
        return getUserDataCall(id, fields, qs);
    }

    function handover(id: string, targetAppId = '263902037430900', metadata?: string) {
        return passThreadControl(id, qs, targetAppId, metadata);
    }

    return {
        send,
        senderAction,
        getUserData,
        handover
    };
}
