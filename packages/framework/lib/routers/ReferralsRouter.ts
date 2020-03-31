/**
 * ebony-framework
 *
 * @module routers/ReferralsRouter
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import BasicRouter from './BasicRouter';
import User from '../models/User';

export default class ReferralsRouter extends BasicRouter {
    public referralsRouter<U extends User>(messaging: any, user: U, referral: any) {
        let { ref } = referral;
        if (!ref) {
            ref = referral;
        }

        const func = this.getRoute(ref);
        if (func) {
            return func(user, ref);
        }

        return this.getRoute('default')(user, ref);
    }
}
