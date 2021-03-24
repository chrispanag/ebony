import { EventType } from './webhook';

export interface IViberSetWebhook {
    url: string;
    event_types?: EventType[];
    send_name?: boolean;
    send_photo?: boolean;
}

export interface IViberSetWebhookResult {
    status: number;
    status_message:
        | 'ok'
        | 'invalidUrl'
        | 'invalidAuthToken'
        | 'badData'
        | 'missingData'
        | 'failure';
}

export interface IViberSendMessageResult {
    status: number;
    status_message?: string;
    message_token: string;
}
