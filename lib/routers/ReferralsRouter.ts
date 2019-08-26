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

    public referralsRouter(messaging: any, user: User, referral: any) {
        const { id } = user;
        let { ref } = referral;
        if (!ref) {
            ref = referral;
        }
        const func = this.getRoute(ref);
        if (func) {
            return func(id, user, ref);
        }

        return this.getRoute('default')(id, user, ref);
    }
}
