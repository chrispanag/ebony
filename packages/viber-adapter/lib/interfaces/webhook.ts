import { MessageData } from './message_types';

export type EventType =
    | 'message'
    | 'delivered'
    | 'seen'
    | 'subscribed'
    | 'unsubscribed'
    | 'conversation_started'
    | 'webhook'
    | 'client_status'
    | 'failed';

export type WebhookIncomingViberEvent =
    | IViberMessageEvent
    | IViberSubscribedEvent
    | IViberUnsubscribedEvent
    | IViberConversationStartedEvent
    | IViberDeliveredEvent
    | IViberSeenEvent
    | IViberWebhookEvent
    | IViberClientStatusEvent
    | IViberFailedEvent;

export interface IViberEvent {
    event: EventType;
    timestamp: number;
    chat_hostname: string;
    message_token: string;
}

export interface IViberClientStatusEvent extends IViberEvent {
    event: 'client_status';
}
export interface IViberWebhookEvent extends IViberEvent {
    event: 'webhook';
}

export interface IViberSender {
    id: string;
    name?: string;
    avatar?: string;
    language?: string;
    country?: string;
    api_version: number;
}

export interface IViberMessageEvent extends IViberEvent {
    event: 'message';
    sender: IViberSender;
    message: MessageData;
    silent: boolean;
}

export interface IViberSubscribedEvent extends IViberEvent {
    event: 'subscribed';
    user: IViberSender;
}

export interface IViberUnsubscribedEvent extends IViberEvent {
    event: 'unsubscribed';
    user_id: string;
}

export interface IViberConversationStartedEvent extends IViberEvent {
    event: 'conversation_started';
    type: 'open';
    context?: string;
    user: IViberMessageEvent;
    subscribed: boolean;
}

export interface IViberDeliveredEvent extends IViberEvent {
    event: 'delivered';
    user_id: string;
}

export interface IViberSeenEvent extends IViberEvent {
    event: 'seen';
    user_id: string;
}

export interface IViberFailedEvent extends IViberEvent {
    event: 'failed';
    user_id: string;
    desc: string;
}
