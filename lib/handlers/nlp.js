/* 
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

function nlpHandlerFactory(intentRouter, yes_noAnswer, complexNlp = () => Promise.resolve()) {
    return (id, message, nlp, user) => {
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
}

module.exports = nlpHandlerFactory;
