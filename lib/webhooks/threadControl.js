/**
 * ebony-framework
 * 
 * @module webhooks/threadControl
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

/**
 * @param {object} db - The MongoDB connection object
 * @returns {function} - A function that runs whenever a thread control event happens in our Webhook
 */
function threadControlWebhook(db) {
    const collection = db.collection('users');

    return entry => {
        if (entry.pass_thread_control) {
            console.log(entry);
            const id = entry.sender.id;
            return collection.findOneAndUpdate({ id }, { $set: { handovered: false } });
        }
    }
}

module.exports = threadControlWebhook;
