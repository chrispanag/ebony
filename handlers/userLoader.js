/*
    The context module is the one responsible for storing the state of conversation of each user, as well as his name, gender and other info.
    Whenever a user sends a message to our bot, the getContext method is initiated which embeds the "user" object inside the messaging object.

    In this implementation, the context is handled "in memory". If you want to change the storage to a DB or Redis you only need to change the 
    retrieveUser, storeUser and setContext methods.
*/

function userLoaderFactory(userModelFactory, db, fb) {

    const User = userModelFactory(db, fb);

    function userLoader(messaging) {
        const id = messaging.sender.id;

        return retrieveUser(id).then(user => {
            if (user) {
                // If we already have the user stored (a session exists)
                console.log('[Info] Found user!');
                messaging.user = user;
            } else {
                console.log('[Info] New user!');
                const newUser = new User({ id, data: {}, stored: false });
                return newUser.getDataAndStore().then(() => {
                    messaging.user = newUser;
                    return messaging;
                });
            }

            return messaging;
        }).catch(err => {
            console.log(`[Error]`);
            console.log(err);
        });
    }

    // Private Functions
    function retrieveUser(id) {
        return User.retrieve(id);
    }

    return userLoader;
}

module.exports = userLoaderFactory;

