/**
 * ebony-framework
 * 
 * @module routers/ReferralsRouter
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

const BasicRouter = require('./BasicRouter');

/**
 * A ReferralsRouter
 * @extends BasicRouter
 */
class ReferralsRouter extends BasicRouter {

    referralsRouter(messaging, user, referral) {
        const { id } = user;
        let { ref } = referral;
        if (!ref)
            ref = referral;
        const func = this.getRoute(ref);
        if (func)
            return func(id, user, ref);

        return this.getRoute('default')(id, user, ref);
    }
}

module.exports = ReferralsRouter;
