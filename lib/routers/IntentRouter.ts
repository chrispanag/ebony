/**
 * ebony-framework
 *
 * @module routers/IntentRouter
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import BasicRouter from './BasicRouter';
import { WitNLP } from '../interfaces/nlp';

/**
 * Intent router class
 * @extends BasicRouter
 */
export default class IntentRouter extends BasicRouter {

    public intentRouter<U>(user: U, msg: any, nlp: WitNLP) {
        if (nlp.entities.intent) {
            if (nlp.entities.intent[0]) {
                if (nlp.entities.intent[0].value) {
                    const func = this.getRoute(nlp.entities.intent[0].value);
                    if (func) {
                        return func;
                    }

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
