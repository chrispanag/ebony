/**
 * ebony-framework
 * 
 * @module utilities/actions
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

/**
 * The Actions Class
 */
class Actions {

    /**
     * Creates an Actions Instance
     * @param {Object} options - The options of the actions
     */
    constructor({ preAction = (callback, ...params) => callback(...params) }) {
        this.actions = {};
        this.preAction = preAction;
    }

    /**
     * Adds actions to the bot
     * @param {Object} actions - The Actions to be added
     * @returns {void} 
     */
    importActions(actions = {}) {
        this.actions = Object.assign(this.actions, actions);
    }

    /**
     * Executes an action
     * @param {string} actionName - The name of the action
     * @param {string} id - The id of the user
     * @param {User} user - The user
     * @param {...*} params - Parameters passed to the action
     * @returns {Promise} - Returns a Promise
     * @throws Throws an error if the action doesn't exist
     */
    exec(actionName, id, user, ...params) {
        if (actionName in this.actions)
            return this.preAction(this.actions[actionName], id, user, ...params);

        throw new Error(`[Error] Action with name: ${actionName} doesn't exist!`);
    }

}

module.exports = Actions;
