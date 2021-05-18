import { ActionMiddleware, InMemoryUser } from '@ebenos/framework';

export const preMiddlewares: Array<ActionMiddleware<InMemoryUser>> = [
    (actionName: string, user: InMemoryUser, params: any[], next: () => void): void => {
        console.log(
            `User ${user.firstName} triggered action: ${actionName} with params ${JSON.stringify(
                params
            )}`
        );
        next();
    }
];
