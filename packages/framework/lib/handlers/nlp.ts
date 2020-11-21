/**
 * ebony-framework
 *
 * @module handlers/nlp
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2020 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import IntentRouter from '../routers/IntentRouter';
import User from '../models/User';
import { WitNLP } from '../interfaces/nlp';
import { Bot } from '../index';
import { IUser } from '../models/UserSchema';

export interface INLPHandlerOptions {
    confidenceThreshold?: number;
    maxMessageLength?: number;
}

/**
 * @param intentRouter - An IntentRouter instance
 * @returns Returns the nlpHandler function
 */

function nlpHandlerFactory<U extends User<any>>(
    intentRouter: IntentRouter,
    options?: INLPHandlerOptions
) {
    const MAX_LENGTH = options?.maxMessageLength ? options.maxMessageLength : 51;
    const MIN_CONFIDENCE = options?.confidenceThreshold ? options.confidenceThreshold : 0.9;
    function nlpHandler(this: Bot<U>, user: U, message: { text: string }, nlp: WitNLP) {
        // The NLP object doesn't exist if the user hasn't activated the built in NLP
        if (nlp) {
            const msg = message.text;
            if (nlp.entities.intent) {
                if (nlp.entities.intent[0].confidence > MIN_CONFIDENCE && msg.length < MAX_LENGTH) {
                    const action = intentRouter.intentRouter(user.id, msg, nlp);
                    if (action) {
                        return action(user, nlp);
                    }
                }
            }

            console.log('Sending to Complex NLP');
            return this.complexNlp(user, message, nlp);
        }

        console.log('No NLP object!');
        // TODO : Add a fallback message (next release)
    }

    return nlpHandler;
}

export default nlpHandlerFactory;
