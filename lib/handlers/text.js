/*!
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

const TextMatcher = require('../utilities/TextMatcher');

function textHandlerFactory(matcher = new TextMatcher(), nlpHandler = () => Promise.resolve()) {

    return (message, id, nlp, user) => {
        const action = matcher.ruleMatcher(message);
        if (action)
            return action(id, user, message);

        return nlpHandler(id, message, nlp, user).catch(err => console.log(err));
    };
}

module.exports = textHandlerFactory;
