import {
    IViberSendMessageResult,
    IViberSetWebhook,
    IViberSetWebhookResult
} from '../interfaces/api';
import viberRequest from './viberRequest';

export function setWebhook(webhookUrl: string, authToken: string): Promise<IViberSetWebhookResult> {
    const body: IViberSetWebhook = {
        url: webhookUrl
    };
    return viberRequest('set_webhook', body, authToken) as Promise<IViberSetWebhookResult>;
}

export function sendMessage(
    receiver: string,
    messageBody: Record<string, unknown>,
    authToken: string
): Promise<IViberSendMessageResult> {
    const body = {
        receiver,
        ...messageBody
    };

    return viberRequest('send_message', body, authToken) as Promise<IViberSendMessageResult>;
}
