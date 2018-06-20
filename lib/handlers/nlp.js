/**
 * ebony-framework
 * 
 * @module handlers/nlp
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

/**
 * @param {IntentRouter} intentRouter - An IntentRouter instance
 * @param {function} yes_noAnswer - A function that handles sentiment returns a Promise
 * @param {function} complexNlp - A function that returns a Promise
 * @returns {function} - Returns the nlpHandler function
 */
function nlpHandlerFactory(intentRouter, yes_noAnswer, complexNlp = () => Promise.resolve()) {
    return (id, message, nlp, user) => {
        // The NLP object doesn't exist if the user hasn't activated the built in NLP
        if (nlp) {
            const msg = message.text;
            if (nlp.entities.intent) {
                if (nlp.entities.intent[0].confidence > 0.90 && (msg.length < 51)) {
                    const action = intentRouter.intentRouter(id, msg, nlp, user);
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
