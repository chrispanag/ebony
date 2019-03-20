import { Router } from 'express';
import PostbackRouter from './routers/PostbackRouter';
import ReferralsRouter from './routers/ReferralsRouter';
import TextMatcher from './utilities/TextMatcher';
import User from './models/User';

// TODO: Add all
export interface IRouters {
    PostbackRouter?: PostbackRouter;
    ReferralsRouter?: ReferralsRouter;
    TextMatcher?: TextMatcher;
}

interface EbonyHandlers {
    [key: string]: (...params: any) => any;
}

export default abstract class GenericAdapter {
    public webhook: Router;
    protected handlers: EbonyHandlers;
    protected routers: IRouters
    protected userModel: (new <T extends User>(...params: any) => T) | (new (...params: any) => User);

    constructor(userModel: ((new <T extends User>(...params: any) => T) | (new (...params: any) => User)) = User) {
        this.webhook = Router();
        this.handlers = {};

        this.routers = {};

        this.userModel = userModel;
    }

    public setRouters(routers: IRouters) {
        this.routers = routers;
    }

    public abstract initWebhook(): void;

    // Available Actions
    public abstract sender(): (id: string, message: any, options: any) => Promise<any>;

    public abstract startsTyping(): (id: string) => Promise<any>;

    public wait(millis: number) {
        return new Promise(resolve => {
            setTimeout(() => resolve(), millis);
        });
    }
}

