/**
 * ebony-framework
 * 
 * @module utilities/TextMatcher
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
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
