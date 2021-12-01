/**
 * ebony-framework
 *
 * @module utilities/TextMatcher
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2020 Christos Panagiotakopoulos
 * @license MIT
 *
 */
import { IPayload } from '../interfaces/payload';

export interface ITextRule {
    regex: RegExp;
    action: (user: any, payload?: IPayload, ...args: any[]) => any;
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

    public ruleMatcher(message: {
        text: string;
    }): ((user: any, payload?: IPayload, ...args: any[]) => any) | false {
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
