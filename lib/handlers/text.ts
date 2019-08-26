/**
 * ebony-framework
 * 
 * @module handlers/text
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

import TextMatcher from '../utilities/TextMatcher';
import User from '../models/User';
import { WitNLP } from '../interfaces/nlp';

/**
 * @param {TextMatcher} matcher - A TextMatcher Instance
 * @param {function} nlpHandler - An nlpHandler function
 * @returns {function} - Returns a textHandler function
 */

type nlpHandlerF = (...params: any) => Promise<any>;

function defaultNlpHandler() {
    return Promise.resolve();
}

export default function textHandlerFactory(matcher: TextMatcher = new TextMatcher(), nlpHandler: nlpHandlerF = defaultNlpHandler) {
    return (message: { text: string }, nlp: WitNLP, user: User) => {
        const action = matcher.ruleMatcher(message);
        if (action) {
            return action(user.id, user, message);
        }

        return nlpHandler(user.id, message, nlp, user);
    };
}
