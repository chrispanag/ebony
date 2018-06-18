/*
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

const BasicRouter = require('./BasicRouter');

class IntentRouter extends BasicRouter {

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
