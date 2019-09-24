import { User } from "..";
import ContextRouter from "../routers/ContextRouter";

import { Action } from "../interfaces/bot";
import Actions from "../utilities/actions";

function locationHandlerFactory<UserModel extends User>(
    locationRouter: ContextRouter,
    locationFallback: Action,
    actions: Actions<UserModel>
) {

    return (user: UserModel, coordinates: any) => {
        const res = locationRouter.getContextRoute(user, coordinates);

        if (!res) {
            return actions.exec(locationFallback.call, user, coordinates);
        }

        return res;
    };
}

export default locationHandlerFactory;