import { User } from "..";

/**
 * @param {Object} actions - The actions object
 * @param {String[]} actionNames - The names of the default actions
 * @returns {Object} - Returns the default actions
 */
export default function generateDefaultActions(actions: { [key: string]: any }, actionNames: string[] = []) {
    const defaultActions: any = {};

    const df = (name: string) => (id: string, user: User, ...params: any) => actions.exec(name, id, user, ...params);

    actionNames.forEach((actionName: string) => {
        const newDefaultAction: any = {};
        newDefaultAction[actionName] = df(name);
        Object.assign(defaultActions, newDefaultAction);
    });

    return defaultActions;
}