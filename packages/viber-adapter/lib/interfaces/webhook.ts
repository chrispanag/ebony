type EventType =
    | 'message'
    | 'delivered'
    | 'seen'
    | 'subscribed'
    | 'unsubscribed'
    | 'conversation_started'
    | 'failed';

type MessageType =
    | 'text'
    | 'picture'
    | 'video'
    | 'file'
    | 'sticker'
    | 'contact'
    | 'url'
    | 'location';

export interface IViberEvent {
    event: EventType;
    timestamp: number;
    chat_hostname: string;
    message_token: string;
}

export interface IViberSender {
    id: string;
    name: string;
    avatar: string;
    language: string;
    country: string;
    api_version: number;
}

export interface IViberMessageData {
    text: string;
    type: MessageType;
    tracking_data: string;
    media?: string;
    location?: {
        lat: number;
        lon: number;
    };
    contact?: {
        name: string;
        phone_number: string;
    };
    file_name?: string;
    file_size?: number;
    duration?: number;
    sticker_id: string;
}

export interface IViberMessageEvent extends IViberEvent {
    event: 'message';
    sender: IViberSender;
    message: IViberMessageData;
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
    context: string;
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
