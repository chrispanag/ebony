import { ActionMiddleware, InMemoryUser } from '@ebenos/framework';
import { MessengerUser } from '@ebenos/messenger-adapter';

export const preMiddlewares: Array<ActionMiddleware<InMemoryUser>> = [
    (actionName: string, user: InMemoryUser, params: any[], next) => {
        console.log(
            `User ${user.firstName} triggered action: ${actionName} with params ${JSON.stringify(
                params
            )}`
        );
        next();
    }
];
