import PostbackRouter from "../routers/PostbackRouter";
import ReferralsRouter from "../routers/ReferralsRouter";
import User from "../models/User";

export interface MessagingWebhookOptions {
    attachmentHandler: (id: string, attachment: any, user: User) => Promise<any>;
    textHandler: (id: string, text: any, nlp: any, user: User) => Promise<any>;
    postbackRouter: PostbackRouter;
    getContext: (data: any) => Promise<any>;
    referralsRouter: ReferralsRouter;
    isMenu?: (postback?: any) => boolean;
    isCustomerService?: (messaging: any) => boolean;
    customerServiceHandler?: (messaging: any) => any;
    isKey?: (text: any) => boolean;
}

export interface CommentWebhookOptions {
    isContestPost: (id: string) => { num: number };
    contestEnroll: (data: any, num: number) => any;
}