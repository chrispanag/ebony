/*
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

const BasicRouter = require('./BasicRouter');

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
