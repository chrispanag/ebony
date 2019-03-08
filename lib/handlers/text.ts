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
export default function textHandlerFactory(matcher: TextMatcher = new TextMatcher(), nlpHandler: (...params: any) => Promise<any> = () => Promise.resolve()) {

    return (message: { text: string }, nlp: WitNLP, user: User) => {
        const action = matcher.ruleMatcher(message);
        if (action) {
            return action(user.id, user, message);
        }

        return nlpHandler(user.id, message, nlp, user);
    };
}
