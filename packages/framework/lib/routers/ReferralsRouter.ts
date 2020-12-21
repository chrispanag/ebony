/**
 * ebony-framework
 *
 * @module routers/ReferralsRouter
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2020 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import BasicRouter from './BasicRouter';
export default class ReferralsRouter extends BasicRouter {
    public referralsRouter<U>(user: U, referral: Record<string, any>): any {
        let { ref } = referral;
        if (!ref) {
            ref = referral;
        }

        const func = this.getRoute(ref);
        if (func) {
            return func(user, ref);
        }

        const defaultFunc = this.getRoute('default');
        if (defaultFunc) {
            return defaultFunc(user, ref);
        }

        throw new Error('Unkown referral type ' + ref);
    }
}
