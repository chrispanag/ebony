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
import { Bot } from '../index';

/**
 * @param {TextMatcher} matcher - A TextMatcher Instance
 * @param {function} nlpHandler - An nlpHandler function
 * @returns {function} - Returns a textHandler function
 */

type nlpHandlerF = (user: User, message: { text: string}, nlp: WitNLP) => Promise<any>;

function defaultNlp(user: User, message: { text: string}, nlp: WitNLP | undefined) {
    if (!nlp) {
        console.log("No NLP Handler");
    }

    return Promise.resolve();
}

export default function textHandlerFactory(matcher: TextMatcher = new TextMatcher(), nlpHandler: nlpHandlerF = defaultNlp) {
    function textHandler(this: Bot, message: { text: string }, nlp: WitNLP, user: User) {
        const action = matcher.ruleMatcher(message);
        if (action) {
            return action(user.id, user, message);
        }

        console.log("Sending to NLP Handler");
        return nlpHandler(user, message, nlp);
    }

    return textHandler;
}
