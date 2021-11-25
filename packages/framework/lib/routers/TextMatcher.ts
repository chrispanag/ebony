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
    action: (user: any, param: object) => any;
}

/**
 * A Text Matcher
 */
export default class TextMatcher {
    private rules: ITextRule[] = [];

    /**
     * Adds text rules
     */
    public importRules(rules: ITextRule[]): void {
        this.rules = this.rules.concat(rules);
    }

    public ruleMatcher(message: { text: string }): ((user: any, param: object) => any) | false {
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
