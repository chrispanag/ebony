/**
 * ebony-framework
 * 
 * @module webhooks/threadControl
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

import { Db } from "mongodb";

interface ThreadControlEntry {
    sender: {
        id: string;
    };
    pass_thread_control: any;
}

/**
 * @param {object} db - The MongoDB connection object
 * @returns {function} - A function that runs whenever a thread control event happens in our Webhook
 */
export default function threadControlWebhook(db: Db) {
    const collection = db.collection('users');

    return (entry: ThreadControlEntry) => {
        if (entry.pass_thread_control) {
            const id = entry.sender.id;
            return collection.findOneAndUpdate({ id }, { $set: { handovered: false } });
        }
    }
}