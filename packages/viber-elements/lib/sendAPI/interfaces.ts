import { Button } from './buttons';
import { Picture } from './attachments';
import { Sender } from './message';

export function isObjectPayload(
    payload: string | Record<string, unknown>
): payload is Record<string, unknown> {
    return typeof payload === 'object';
}

export interface MessageBody {
    recipient: {
        id: string;
    };
    message: Record<string, unknown>;
    notification_type: string;
    messaging_type: string;
}

export interface ElementInput {
    columns?: number | null;
    rows?: number | null;
    action_type?: string | null;
    action_body?: string | null;
    text?: string | null;
    text_size?: number | null;
    textV_align?: string | null;
    textH_align?: string | null;
    image_url?: string | null;
}

export interface GenericTemplateOptions {
    elements: any[];
    image_aspect_ratio?: string;
    sharable?: string;
    ButtonsGroupColumns?: number;
    ButtonsGroupRows?: number;
    BgColor?: string;
}

export interface MessageOptions {
    sender?: Sender | null;
    tracking_data?: string | null;
    type?: string | null;
    text?: string | null;
    attachment?: Picture | null;
}

export type SerializedMessage = SerializedAttachmentMessage | SerializedTextMessage;

export interface SerializedAttachmentMessage {
    attachment: Record<string, unknown>;
}

export interface SerializedTextMessage {
    text: string;
    type: string;
    sender: Sender;
    tracking_data: string;
}

export interface SerializedQuickreply {
    content_type: string;
    title: string;
    payload: string;
}
