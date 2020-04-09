import { WitNLP } from '@ebenos/framework';

export interface MessengerWebhookBody {
    object: string;
    entry: FacebookWebhookEntry[];
}

export interface FacebookWebhookEntry {
    id: string;
    time: number;

    messaging?: MessagingEntry[];
    changes?: any[];
    standby?: Standby[];
}

export interface MessagingEntry {
    sender: {
        id: string;
    };

    recipient: {
        id: string;
    };

    message?: Message;
    delivery?: Delivery;
    referral?: Referral;
    postback?: Postback;
    pass_thread_control?: PassThreadControl;
    take_thread_control?: TakeThreadControl;
    request_thread_control?: RequestThreadControl;
    app_roles?: AppRoles;
    optin?: Optin | OneTimeNotification;
}

export interface Message {
    mid: string;
    text: string;
    nlp?: WitNLP;

    attachments?: Array<{
        type: string;
        payload: any;
    }>;

    quick_reply?: {
        payload: string;
    };
}

export interface Postback {
    title: string;
    payload?: string;
    referral?: Referral;
}

export interface Referral {
    ref?: string;
    source: string;
    type: string;
    referer_uri?: string;
    ad_id?: string;
}

// TODO: Add it
export interface Standby {}

export interface Delivery {
    mids?: string[];
    watermark: number;
    seq?: number;
}

export interface PassThreadControl {
    new_owner_app_id: string;
    metadata: string;
}

export interface TakeThreadControl {
    previous_owner_app_id: string;
    metadata: string;
}

export interface RequestThreadControl {
    requested_owner_app_id: string;
    metadata: string;
}

export interface AppRoles {
    [key: string]: string[];
}

export interface Optin {
    ref: string;
    user_ref: string;
}

export interface OneTimeNotification {
    type: 'one_time_notif_req';
    payload: string;
    one_time_notif_token: string;
}

export function isOneTimeNotificationOptin(
    optin: Optin | OneTimeNotification
): optin is OneTimeNotification {
    return 'type' in optin && optin.type === 'one_time_notif_req';
}
