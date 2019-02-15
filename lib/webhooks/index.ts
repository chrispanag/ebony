/**
 * ebony-framework
 * 
 * @module webhooks
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

import commentWebhook from './comment';
import messagingWebhook from './messaging';
import threadControlWebhook from './threadControl';
import standbyWebhook from './standby';

const exported = {
    commentWebhook,
    messagingWebhook,
    threadControlWebhook,
    standbyWebhook
};

export default exported;