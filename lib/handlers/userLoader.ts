/**
 * ebony-framework
 * 
 * @module handlers/userLoader
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

import User from '../models/User'
import MessengerUser from "../models/MessengerUser";

/*
    The context module is the one responsible for storing the state of conversation of each user, as well as his name, gender and other info.
    Whenever a user sends a message to our bot, the getContext method is initiated which embeds the "user" object inside the messaging object.

    In this implementation, the context is handled "in memory". If you want to change the storage to a DB or Redis you only need to change the 
    retrieveUser, storeUser and setContext methods.
*/

export default async function userLoader(messaging: any, provider: string) {
    const id = messaging.sender.id;
    try {
        let user = await User.findOne({ id });
        if (!user) {
            user = new User({
                id,
                provider
            });
        }

        switch (provider) {
            case "fbmessenger":
                messaging.user = new MessengerUser(user);
                // Add provider specific actions (initialization)
                break;
            // Here we can add more providers (we need to make it extensible)
            default:
                throw new Error(`Unkown provider ${provider}`);
        }

        await messaging.user.save();

        return messaging;
    } catch (err) {
        throw err;
    }
}

