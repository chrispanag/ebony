/**
 * ebony-framework
 * 
 * @module routers/IntentRouter
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

const BasicRouter = require('./BasicRouter');

/**
 * Intent router class
 * @extends BasicRouter
 */
class IntentRouter extends BasicRouter {

    /**
     * 
     * @param {string} id - The id of the user
     * @param {string} msg - The message
     * @param {object} nlp - The NLP Object
     * @returns {boolean|function} - Returns false if this intent is not found
     * @throws It throws an error when an intent is not defined
     */
    intentRouter(id, msg, nlp) {
        if (nlp.entities.intent) {
            if (nlp.entities.intent[0]) {
                if (nlp.entities.intent[0].value) {
                    const func = this.getRoute(nlp.entities.intent[0].value);
                    if (func)
                        return func;

                    console.log(`[Warning] Intent not ${nlp.entities.intent[0].value} found!`);
                    return false;
                }

                throw new Error(`intentHandler: 'Intent[0].value' is not defined`);
            }

            throw new Error(`intentHandler: 'Intent[0]' is not defined`);
        }

        throw new Error(`intentHandler: Entity 'Intent' doesn't exist.`);
    }

}

module.exports = IntentRouter;
