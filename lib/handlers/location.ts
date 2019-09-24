import { User } from "..";
import ContextRouter from "../routers/ContextRouter";

import { Action } from "../interfaces/bot";
import Actions from "../utilities/actions";

function locationHandlerFactory<U extends User>(
    locationRouter: ContextRouter,
    locationFallback: Action,
    actions: Actions<U>
) {

    return (user: U, coordinates: any) => {
        const res = locationRouter.getContextRoute(user, coordinates);

        if (!res) {
            return actions.exec(locationFallback.call, user, coordinates);
        }

        return res;
    };
}

export default locationHandlerFactory;