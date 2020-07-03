/**
 * ebony-framework
 *
 * @module utilities/TextMatcher
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2020 Christos Panagiotakopoulos
 * @license MIT
 *
 */

export interface ITextRule {
    regex: RegExp;
    action: (...param: any[]) => any;
}

/**
 * A Text Matcher
 */
export default class TextMatcher {
    private rules: ITextRule[];

    constructor() {
        this.rules = [];
    }

    /**
     * Adds text rules
     */
    public importRules(rules: ITextRule[]) {
        this.rules = this.rules.concat(rules);
    }

    public ruleMatcher(message: { text: string }) {
        const msg = message.text.toUpperCase();
        for (const rule of this.rules) {
            const { regex, action } = rule;
            if (regex.test(msg)) {
                regex.lastIndex = 0;
                return action;
            }
        }

        return false;
    }
}
