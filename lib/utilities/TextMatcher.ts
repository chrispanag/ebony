/**
 * ebony-framework
 * 
 * @module utilities/TextMatcher
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

/**
 * A Text Matcher
 */
export default class TextMatcher {
    private rules: any[];

    constructor() {
        this.rules = [];
    }

    /**
     * Adds text rules
     * @param {Array} rules - The rules to be added
     * @returns {void}
     */
    importRules(rules: any[]) {
        this.rules = this.rules.concat(rules);
    }


    /**
     * 
     * @param {Object} message - 
     * @returns {function|boolean} - 
     */
    ruleMatcher(message: { text: string }) {
        const msg = message.text.toUpperCase();
        for (const rule of this.rules) {
            const { regex, action } = rule;
            if (regex.test(msg))
                return action;
        }

        return false;
    }
}
