/**
 * ebony-framework
 * 
 * @module webhooks/messaging
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

function messagingWebhook({ attachmentHandler, textHandler, postbackRouter, getContext, referralsRouter, isMenu = () => false, isCustomerService = () => false, customerServiceHandler = () => null }) {
    if (!attachmentHandler)
        throw new Error("[Fatal] Messenger Webhook: No attachmentHandler is set");
    if (!textHandler)
        throw new Error("[Fatal] Messenger Webhook: No textHandler is set");
    if (!postbackRouter)
        throw new Error("[Fatal] Messenger Webhook: No postbackRouter is set");
    if (!getContext)
        throw new Error("[Fatal] Messenger Webhook: No getContext is set");
    if (!referralsRouter)
        throw new Error("[Fatal] Messenger Webhook: No referralsRouter is set");

    return data => {
        return getContext(data).then(messaging => {
            const id = messaging.sender.id;
            if (isCustomerService(messaging))
                return customerServiceHandler(messaging);

            if (messaging.message) {
                // ECHOs
                if (messaging.message.is_echo) {
                    console.log(`[Info] Echo message: ${messaging.message}`);
                    return;
                }
                // ATTACHMENTS
                if (messaging.message.attachments)
                    // For each attachment run the attachment handler once
                    return Promise.all(messaging.message.attachments.map(a => attachmentHandler(id, a, messaging.user)));
                // TEXT
                else if (messaging.message.text && !messaging.message.quick_reply)
                    return textHandler(messaging.message, id, messaging.message.nlp, messaging.user);
                // QUICKREPLIES
                else if (messaging.message.quick_reply) {
                    const payload = messaging.message.quick_reply.payload;
                    // If there is no payload treat it as just text
                    if (payload == "\"No Payload\"")
                        return textHandler(id, messaging.message.text, messaging.user);
                    // If there is a payload
                    return postbackRouter.stringPayloadHandler(messaging, payload, messaging.user);
                }
            }
            // Button pushes
            if (messaging.postback && messaging.postback.payload) {
                if (isMenu(messaging.postback) && messaging.user.handovered) {
                    return messaging.user.makeNew().then(() => {
                        console.log(`[Info] User: ${messaging.user.first_name} ${messaging.user.last_name} with the id: ${messaging.user.id} is taken by the Bot!`);
                        if (messaging.postback.referral) {
                            if (messaging.postback.referral.ref)
                                return referralsRouter.referralsRouter(messaging, messaging.user, messaging.postback.referral)
                        }

                        return postbackRouter.stringPayloadHandler(messaging, messaging.postback.payload, messaging.user);
                    });
                }
                if (messaging.postback.referral)
                    return referralsRouter.referralsRouter(messaging, messaging.user, messaging.postback.referral.ref);

                return postbackRouter.stringPayloadHandler(messaging, messaging.postback.payload, messaging.user);
            }
            if (messaging.referral) {
                if (messaging.referral.ref)
                    return referralsRouter.referralsRouter(messaging, messaging.user, messaging.referral.ref);
            }
        });
    };
}

module.exports = messagingWebhook;
