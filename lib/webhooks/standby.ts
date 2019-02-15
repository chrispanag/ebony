/**
 * ebony-framework
 * 
 * @module webhooks/standby
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

import { MessagingWebhookOptions } from './interfaces';


export default function standbyWebhook({ attachmentHandler, textHandler, postbackRouter, getContext, referralsRouter, isKey = () => false }: MessagingWebhookOptions) {
    if (!attachmentHandler)
        throw new Error("[Fatal] Standby Webhook: No attachmentHandler is set");
    if (!textHandler)
        throw new Error("[Fatal] Standby Webhook: No textHandler is set");
    if (!postbackRouter)
        throw new Error("[Fatal] Standby Webhook: No postbackRouter is set");
    if (!getContext)
        throw new Error("[Fatal] Standby Webhook: No getContext is set");
    if (!referralsRouter)
        throw new Error("[Fatal] Standby Webhook: No referralsRouter is set");

    return (data: any) => getContext(data).then(messaging => {
        const id = messaging.sender.id;
        // PLAIN MESSAGES (QR, TEXT, ATTACHMENTS)
        if (messaging.message && messaging.message.text) {
            if (isKey(messaging.message.text)) {
                console.log(`[Info] User: ${messaging.user.first_name} ${messaging.user.last_name} with the id: ${messaging.user.id} is taken by the Bot!`);
                return messaging.user.makeNew().then(() => textHandler(messaging.message, id, messaging.message.nlp, messaging.user));
            }

            if (messaging.message.quick_reply) {
                console.log(`[Info] User: ${messaging.user.first_name} ${messaging.user.last_name} with the id: ${messaging.user.id} is taken by the Bot!`);
                return messaging.user.makeNew().then(() => postbackRouter.stringPayloadHandler(messaging, messaging.message.quick_reply.payload, messaging.user));
            }
            // POSTBACKS
        } else if (messaging.postback) {
            console.log(`Sent messaging postback with title: ${messaging.postback.title}`)
            // REFERRALS (NOT FROM GET STARTED)
        } else if (messaging.referral && (messaging.referral.source == "SHORTLINK")) {
            if (messaging.referral.ref) {
                console.log(`[Info] User: ${messaging.user.first_name} ${messaging.user.last_name} with the id: ${messaging.user.id} is taken by the Bot!`);
                return messaging.user.makeNew().then(() => referralsRouter.referralsRouter(messaging, messaging.user, messaging.referral))
            }
        }
    });
}