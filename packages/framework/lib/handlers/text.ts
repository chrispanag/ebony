/**
 * ebony-framework
 *
 * @module handlers/text
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2020 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import TextMatcher from '../routers/TextMatcher';
import User from '../models/User';
import { WitNLP } from '../interfaces/nlp';
import Bot from '../bot';

/**
 * @param {TextMatcher} matcher - A TextMatcher Instance
 * @param {function} nlpHandler - An nlpHandler function
 * @returns {function} - Returns a textHandler function
 */

type nlpHandlerF<U> = (user: U, message: { text: string }, nlp: WitNLP) => Promise<any>;

function defaultNlp<U>(user: U, message: { text: string }, nlp: WitNLP | undefined) {
    if (!nlp) {
        console.log('No NLP Handler');
    }

    return Promise.resolve();
}

export default function textHandlerFactory<U extends User<any>>(
    matcher: TextMatcher = new TextMatcher(),
    nlpHandler: nlpHandlerF<U> = defaultNlp
) {
    function textHandler(
        this: Bot<U>,
        message: { text: string; tracking_data?: { [key: string]: string } | string },
        nlp: WitNLP | undefined,
        user: U
    ) {
        const action = matcher.ruleMatcher(message);
        if (action) {
            // This is needs a check when we update on this version
            // Cause now second argument is an object and not just a string
            return action(user, message);
        }

        if (nlp) {
            console.log('Sending to NLP Handler');
            return nlpHandler(user, message, nlp);
        }
    }

    return textHandler;
}
