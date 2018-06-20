/**
 * ebony-framework
 * 
 * @module models/user
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

// The data requested per user that initiates an interaction with the bot
const dataPerUser = [
    'first_name',
    'last_name',
    'gender'
];

/**
 * @param {Object} db - The database connection object
 * @param {Object} fb - The fb object
 * @returns {User} - Returns the User Class
 */
module.exports = (db, fb) => {

    const { getUserData, handover } = fb;

    const collection = db.collection('users');

    /**
     * The User Class
     */
    class User {

        /**
         * @typedef {Object} UserOptions
         * @property {string} id - The PSID of the User
         * @property {object} data - The data of the User
         * @property {boolean} cellLogin - If the user only has a Messenger Profile and not a Facebook one
         * @property {boolean} stored - If the user is already stored in the database
         */
        
        /**
         * Create a User
         * @param {UserOptions} options - The user options
         */
        constructor({ id, data = {}, cellLogin = false, stored = true }) {
            const { first_name = '', last_name = '', gender = null, context = {}, gdpr = false, subscribed = true } = data;
            if (!id)
                throw new Error("User Constructor: No id is set!");

            this.id = id;
            this.first_name = first_name;
            this.last_name = last_name;
            this.gdpr = gdpr;
            this.stored = stored;
            this.gender = gender;
            this._context = context;
            this.subscribed = subscribed;
            this.cellLogin = cellLogin;
        }

        /**
         * @returns {string} - Returns the full name of the user
         */
        get fullname() {
            return `${this.first_name} ${this.last_name}`;
        }

        /**
         * @returns {*} - Returns the context of the user
         */
        get context() {
            return this._context;
        }

        /**
         * Handovers the user per the Handover Protocol
         * @returns {Promise} - Returns a promise that resolves when the handover happens
         */
        handover() {
            this.handovered = true;
            return handover(this.id)
                .then(() => collection.updateOne({ id: this.id }, { $set: { handovered: true } }))
                .catch(err => {
                    if (err.code) {
                        if (err.code == 100) console.log("[Info] User is already handovered!");
                        else console.log(err);
                    }
                });
        }

        subscribe() {
            this.subscribed = true;
            return collection.updateOne({ id: this.id }, { $set: { subscribed: true } });
        }

        unsubscribe() {
            this.subscribed = false;
            return collection.updateOne({ id: this.id }, { $set: { subscribed: false } });
        }

        passGDPR() {
            this.gdpr = "yes";
            this.gdprPushAnswer = true;
            this.registeredOn = new Date();
            this.stored = true;
            return this._patchFBData().then(() => this.constructor.store(this));
        }

        getDataAndStore() {
            this.registeredOn = new Date();
            this.stored = true;
            this.gdpr = "yes";
            return this._patchFBData().then(() => this.constructor.store(this));
        }

        passGDPRPush() {
            return collection.updateOne({ id: this.id }, { $set: { registeredOn: new Date(), gdprPushAnswer: true, gdpr: "yes", stored: true } })
        }

        notPassGDPR() {
            this.gdpr = "no";
            this.subscribed = false;
            return collection.updateOne({ id: this.id }, { $set: { gdpr: "no", subscribed: false } })
            // return this._delete();
        }

        /**
         * Sets the context of the user (It overwrites the old context)
         * @param {*} context - The new context 
         * @returns {Promise} - A promise that resolves when the new context is stored
         */
        setContext(context) {
            this._context = context;
            return collection.findOneAndUpdate({ id: this.id }, { $set: { context } });
        }

        // Private

        _patchFBData() {
            return this._getFBData().then(userData => {
                const { first_name = '', last_name = '', gender = "male" } = userData;

                this.first_name = first_name;
                this.last_name = last_name;
                this.gender = gender;
            });
        }

        _getFBData() {
            return getUserData(this.id, dataPerUser)
                .catch(err => {
                    // The user doesn't have facebook
                    console.log(`[Info]`);
                    console.log(err);
                    return {};
                });
        }

        /**
         * Deletes the user
         * @returns {Promise} - Returns a Promise that resolves when the query has finished
         */
        _delete() {
            return collection.deleteOne({ id: this.id });
        }

        static store(user) {
            const userToStore = Object.assign({}, user);
            if (userToStore.teams)
                userToStore.teams = Array.from(userToStore.teams);
            return collection.findOneAndReplace({ id: user.id }, userToStore, { upsert: true }).catch(err => {
                throw new Error(`User model error on store: ${err}`);
            })
        }

        static retrieve(id) {
            return collection.findOne({ id }).then(userData => {
                if (userData)
                    return new User({ id, data: userData, cellLogin: userData.cellLogin });
                return false;
            }).catch(err => {
                throw new Error(`User model error on retrieve: ${err}`);
            });
        }
    }

    return User;
}

