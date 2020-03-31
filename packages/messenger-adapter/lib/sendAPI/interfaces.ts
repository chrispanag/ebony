import { Button } from "./buttons";
import { QuickReply } from "./quickreplies";
import { Attachment } from "./attachments";

export function isObjectPayload(payload: string | {}): payload is {} {
    return typeof payload === 'object';
}

export interface MessagingOptions {
	tag?: string | null;
	notification_type?: string;	
	type?: string;
}

export interface MessageBody {
	recipient: {
		id: string;
	};
	message: {};
	notification_type: string;
	messaging_type: string;
}

export interface ElementInput { 
    title?: string | null, 
    subtitle?: string | null, 
    image_url?: string | null,
    buttons?: Button[]
}

export interface ListElementInput extends ElementInput {
    action?: string | null
}

export interface GenericTemplateOptions { 
    elements: any[], 
    image_aspect_ratio?: string, 
    sharable?: string
}

export interface ListTemplateOptions { 
    elements: any[], 
    buttons: Button[], 
    large: boolean 
}

export interface MessageOptions {
    text?: string | null, 
    quickreplies?: QuickReply[] | null,
    attachment?: Attachment | null,
    templateID?: string | null
}

export type SerializedMessage = SerializedAttachmentMessage | SerializedTextMessage;

export interface SerializedAttachmentMessage {
    attachment: {}
};

export interface SerializedTextMessage {
    text: string;
    quick_replies: SerializedQuickreply[] | null;
}

export interface SerializedQuickreply {
    content_type: string;
    title: string;
    payload: string;
}