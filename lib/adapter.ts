import { Router } from 'express';
import PostbackRouter from './routers/PostbackRouter';
import ReferralsRouter from './routers/ReferralsRouter';
import TextMatcher from './utilities/TextMatcher';
import User from './models/User';
import { IUser } from './models/UserSchema';

// type UserModel = (new <T extends User>(...params: any) => T) | (new (...params: any) => User);

export type UserModel<T> = { new (...params: any): T, findByProviderId: (id: string) => Promise<IUser | null> } | { new(...params: any): User, findByProviderId: (id: string) => Promise<IUser | null> }

// TODO: Add all
export interface IRouters {
    PostbackRouter?: PostbackRouter;
    ReferralsRouter?: ReferralsRouter;
    TextMatcher?: TextMatcher;
}

interface EbonyHandlers {
    [key: string]: (...params: any) => any;
}

export default abstract class GenericAdapter<T extends User> {
    public webhook: Router;
    protected handlers: EbonyHandlers;
    protected routers: IRouters
    protected userModel: UserModel<T>;

    protected providerName: string;

    constructor(providerName: string, userModel: UserModel<T> = User) {

        this.webhook = Router();
        this.handlers = {};

        this.routers = {};

        this.userModel = userModel;
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

    public userLoader(...args: any): (id: string) => Promise<T | User>  {
        return async (id: string) => {
            try {
                const userData = await this.userModel.findByProviderId(id);
                if (!userData) {
                    const newUser = new this.userModel({
                        id, 
                        provider: this.providerName
                    });
                    newUser.save();

                    return newUser;
                }

                return new this.userModel(userData);
            } catch (err) {
                throw err;
            }
        }
    }
}

