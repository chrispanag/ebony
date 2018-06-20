/**
 * ebony-framework
 * 
 * @module handlers/text
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

const TextMatcher = require('../utilities/TextMatcher');

/**
 * @param {TextMatcher} matcher - A TextMatcher Instance
 * @param {function} nlpHandler - An nlpHandler function
 * @returns {function} - Returns a textHandler function
 */
function textHandlerFactory(matcher = new TextMatcher(), nlpHandler = () => Promise.resolve()) {

    return (message, id, nlp, user) => {
        const action = matcher.ruleMatcher(message);
        if (action)
            return action(id, user, message);

        return nlpHandler(id, message, nlp, user).catch(err => console.log(err));
    };
}

module.exports = textHandlerFactory;
