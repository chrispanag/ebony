import { MessagingEntry, isOneTimeNotificationOptin } from '../adapter/interfaces/webhook';
import { IRouters, EbonyHandlers, User } from '@ebenos/framework';
import MessengerUser from '../adapter/MessengerUser';

interface MessagingWebhookOptions<T extends User> {
    routers: IRouters;
    userLoader: (id: string) => Promise<T>;
    handlers: EbonyHandlers<T>;
}

export default function messagingWebhook<T extends MessengerUser>(
    options: MessagingWebhookOptions<T>
): (e: MessagingEntry) => Promise<void> {
    const { userLoader, routers, handlers } = options;

    return async (e: MessagingEntry) => {
        const user = await userLoader(e.sender.id);
        if (e.message) {
            if (e.message.text) {
                if (e.message.quick_reply) {
                    // TODO: Postbacks and text handler
                    const qr = e.message.quick_reply;
                    if (qr.payload) {
                        routerExists(routers.PostbackRouter).stringPayloadHandler(
                            e,
                            qr.payload,
                            user
                        );
                        return;
                    }
                    throw new Error('Not implemented');
                }
                if (handlers.text) {
                    handlers.text(e.message, e.message.nlp, user);
                } else {
                    throw new Error('No text handler!');
                }
                return;
            }
            if (e.message.attachments) {
                if (handlers.attachment) {
                    e.message.attachments.forEach((a) =>
                        handlers.attachment ? handlers.attachment(user, a) : null
                    );
                } else {
                    throw new Error('No attachment handler!');
                }
                return;
            }
            throw new Error('Not implemented');
        }
        if (e.postback) {
            if (e.postback.referral) {
                const referral = e.postback.referral;
                if (referral.ref) {
                    routerExists(routers.ReferralsRouter).referralsRouter(e, user, referral.ref);
                    return;
                }

                throw new Error('Not implemented');
            }
            if (e.postback.payload) {
                routerExists(routers.PostbackRouter).stringPayloadHandler(
                    e,
                    e.postback.payload,
                    user
                );
                return;
            }

            throw new Error('Not implemented');
        }
        if (e.referral) {
            const referral = e.referral;
            if (referral.ref) {
                routerExists(routers.ReferralsRouter).referralsRouter(e, user, referral.ref);
                return;
            }
            // TODO: Referral handler
            throw new Error('Not implemented');
        }
        if (e.pass_thread_control) {
            throw new Error('Not implemented');
        }
        if (e.request_thread_control) {
            throw new Error('Not implemented');
        }
        if (e.take_thread_control) {
            throw new Error('Not implemented');
        }
        if (e.delivery) {
            throw new Error('Not implemented');
        }
        if (e.app_roles) {
            throw new Error('Not implemented');
        }
        if (e.optin) {
            if (isOneTimeNotificationOptin(e.optin)) {
                routerExists(routers.PostbackRouter).stringPayloadHandler(
                    e,
                    JSON.stringify({ type: e.optin.payload, token: e.optin.one_time_notif_token }),
                    user
                );
            }
        }
    };
}

function routerExists<T>(router: T | undefined): T {
    if (typeof router === 'undefined') {
        throw new Error('Router is undefined');
    }

    return router;
}
