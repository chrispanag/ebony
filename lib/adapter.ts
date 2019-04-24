import { Router } from 'express';
import PostbackRouter from './routers/PostbackRouter';
import ReferralsRouter from './routers/ReferralsRouter';
import TextMatcher from './utilities/TextMatcher';
import User from './models/User';
import { UserModel } from './models/UserSchema';

// type UserModel = (new <T extends User>(...params: any) => T) | (new (...params: any) => User);
type UserModel = { new <T extends User>(...params: any): T, providerName: string, userLoader: (...params: any) => any } | { new(...params: any): User, providerName: string, userLoader: (...params: any) => any }

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
    protected userModel: UserModel;

    protected providerName: string;

    constructor(providerName: string, userModel: UserModel = User) {

        this.webhook = Router();
        this.handlers = {};

        this.routers = {};

        const obj: { [key: string]: any } = {};

        Object.getOwnPropertyNames(userModel).forEach((property: string) => {
            obj[property] = userModel[property];
        });

        this.userModel = obj as UserModel;
        this.userModel.providerName = providerName;
        this.providerName = providerName;
    }

    get provider() {
        return this.providerName;
    }

    public setRouters(routers: IRouters) {
        this.routers = routers;
    }

    public abstract initWebhook(): void;

    // Available Actions
    public abstract get sender(): (id: string, message: any, options: any) => Promise<any>;

    public abstract get startsTyping(): (id: string) => Promise<any>;

    public wait(millis: number) {
        return new Promise(resolve => {
            setTimeout(() => resolve(), millis);
        });
    }
}

