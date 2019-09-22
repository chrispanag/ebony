import { User } from "..";
import ContextRouter from "../routers/ContextRouter";

import { Action } from "../interfaces/bot";
import Actions from "../utilities/actions";

export default function locationHandlerFactory(locationRouter: ContextRouter, locationFallback: Action, actions: Actions) {

    return (user: User, coordinates: any) => {
        const res = locationRouter.getContextRoute(user, coordinates);

        if (!res) {
            return actions.exec(locationFallback.call, user, coordinates);
        }

        return res;
    };
}
