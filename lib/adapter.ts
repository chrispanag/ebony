import { Router } from 'express';
import PostbackRouter from './routers/PostbackRouter';
import ReferralsRouter from './routers/ReferralsRouter';
import TextMatcher from './utilities/TextMatcher';

export interface IRouters {
    PostbackRouter?: PostbackRouter;
    ReferralsRouter?: ReferralsRouter;
    TextMatcher?: TextMatcher;
    
}

interface EbonyHandlers {
    [key: string]: (...params: any) => any;
}

type ContextLoader = any;

export default abstract class GenericAdapter {
    public webhook: Router;
    protected handlers: EbonyHandlers;
    protected contextLoader: (id: string) => Promise<any>;
    protected routers: IRouters

    constructor(contextLoader: ContextLoader) {
        this.webhook = Router();
        this.handlers = {};
        this.contextLoader = contextLoader

        this.routers = {};
    }

    public sender() {
        return (id: string, message: any, options: any) => {
            console.log(message);
            return Promise.resolve();
        }
    }

    public startsTyping() {
        return (id: string) => {
            console.log("Typing...");
            return Promise.resolve();
        }
    }

    public setRouters(routers: IRouters) {
        this.routers = routers;
    }

    public abstract initWebhook(): void;
}

