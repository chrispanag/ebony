/**
 * ebony-framework
 * 
 * @module handlers/nlp
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

import IntentRouter from '../routers/IntentRouter';
import User from '../models/User';
import { WitNLP } from '../interfaces/nlp';

/**
 * @param {IntentRouter} intentRouter - An IntentRouter instance
 * @param {function} yes_noAnswer - A function that handles sentiment returns a Promise
 * @param {function} complexNlp - A function that returns a Promise
 * @returns {function} - Returns the nlpHandler function
 */
export default function nlpHandlerFactory(intentRouter: IntentRouter, yes_noAnswer: (...params: any) => Promise<any>, complexNlp: (...params: any) => Promise<any> = () => Promise.resolve()) {
    return (id: string, message: { text: string }, nlp: WitNLP, user: User) => {
        // The NLP object doesn't exist if the user hasn't activated the built in NLP
        if (nlp) {
            const msg = message.text;
            if (nlp.entities.intent) {
                if (nlp.entities.intent[0].confidence > 0.90 && (msg.length < 51)) {
                    const action = intentRouter.intentRouter(id, msg, nlp);
                    if (action)
                        return action(id, user, nlp);
                }
            }
            if (nlp.entities.sentiment) {
                if (nlp.entities.sentiment[0].confidence > 0.48)
                    return yes_noAnswer(id, user, nlp.entities.sentiment[0].value);
            }

            return complexNlp(id, message, nlp, user);
        }
        // TODO : Add a fallback message (next release)
    }
}

module.exports = nlpHandlerFactory;
