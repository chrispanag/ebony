const _ = require('lodash');

const BasicRouter = require('./BasicRouter');

class ContextRouter extends BasicRouter {
    constructor({ field = '', fallback = () => Promise.resolve() }) {
        super();

        this.field = field;
        this.fallback = fallback;
    }

    getContextRoute(id, user, ...params) {
        const step = _.get(user, this.field);
        const func = this.getRoute(step);
        if (func)
            return func(id, user, ...params);

        return false;
    }
    
}

module.exports = ContextRouter;
