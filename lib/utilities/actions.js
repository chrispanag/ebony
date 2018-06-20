/**
 * ebony-framework
 * 
 * @module utilities/actions
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */


class Actions {
    constructor({ preAction = (callback, ...params) => callback(...params) }) {
        this.actions = {};
        this.preAction = preAction;
    }

    importActions(actions = {}) {
        this.actions = Object.assign(this.actions, actions);
    }

    exec(actionName, id, user, ...params) {
        if (actionName in this.actions)
            return this.preAction(this.actions[actionName], id, user, ...params);
        
        throw new Error(`[Error] Action with name: ${actionName} doesn't exist!`);
    }

}

module.exports = Actions;
