/*!
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

class TextMatcher {
    constructor() {
        this.rules = [];
    }

    importRules(rules) {
        this.rules = this.rules.concat(rules);
    }

    ruleMatcher(message) {
        const msg = message.text.toUpperCase();
        for (const rule of this.rules) {
            const { regex, action } = rule;
            if (regex.test(msg))
                return action;
        }

        return false;
    }
}

module.exports = TextMatcher;
