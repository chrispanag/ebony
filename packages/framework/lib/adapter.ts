import PostbackRouter from './routers/PostbackRouter';
import ReferralsRouter from './routers/ReferralsRouter';
import TextMatcher from './routers/TextMatcher';
import { GenericAttachment } from './interfaces/attachment';
import { WitNLP } from './interfaces/nlp';
import { ISerializable } from '.';
import { IInteraction } from './interfaces/interactions';
import { ITrackingData } from './interfaces/trackingData';
// TODO: Add all
export interface IRouters {
    PostbackRouter?: PostbackRouter;
    ReferralsRouter?: ReferralsRouter;
    TextMatcher?: TextMatcher;
}

export interface EbonyHandlers<U> {
    attachment?: (user: U, attachment: GenericAttachment) => Promise<any>;
    text?: (
        message: {
            text: string;
            tracking_data?: ITrackingData;
            location?: { lon: number; lat: number };
            contact?: {
                name?: string;
                phone_number: string;
                avatar?: string;
            };
        },
        nlp: WitNLP | undefined,
        user: U
    ) => Promise<any>;
}

export interface IBaseMessageOptions {
    delay?: number;
    schedule?: number;
    priority?: number;
}

export interface IBaseMessage<T extends IBaseMessageOptions> {
    type: 'message' | 'typing_on' | 'typing_off' | 'mark_seen' | 'notify';
    id: string;
    message?: ISerializable;
    options?: Partial<T>;
}

export default abstract class GenericAdapter<
    Operations = { handover: (id: string) => Promise<any> }
> {
    protected handlers: EbonyHandlers<any>;
    protected routers: IRouters;
    public abstract operations: Operations;

    // This is the sendAPI method
    public abstract sender: (
        actions: Array<IInteraction<any>>,
        type: 'ORDERED' | 'UNORDERED'
    ) => Promise<void>;

    constructor() {
        this.handlers = {};

        this.routers = {};
    }

    public setRouters(routers: IRouters): void {
        this.routers = routers;
    }

    public setHandlers<U>(handlers: EbonyHandlers<U>): void {
        this.handlers = handlers;
    }

    public abstract initialization(): void;

    public init<U>(routers: InitOptionsRouters, handlers: InitOptionsHandlers<U>): void {
        this.setRouters({
            PostbackRouter: routers.postbackRouter,
            ReferralsRouter: routers.referralsRouter,
            TextMatcher: routers.textMatcher
        });

        this.setHandlers({
            text: handlers.text,
            attachment: handlers.attachment
        });

        this.initialization();
    }
}

interface InitOptionsRouters {
    postbackRouter: PostbackRouter;
    referralsRouter: ReferralsRouter;
    textMatcher: TextMatcher;
}

interface InitOptionsHandlers<U> {
    text: (
        message: {
            text: string;
            tracking_data?: ITrackingData;
            location?: { lon: number; lat: number };
            contact?: {
                name?: string;
                phone_number: string;
                avatar?: string;
            };
        },
        nlp: WitNLP | undefined,
        user: U
    ) => any;
    attachment: (user: U, attachment: GenericAttachment) => Promise<any>;
}
