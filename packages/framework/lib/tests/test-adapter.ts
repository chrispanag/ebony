import { userLoader } from '../models/InMemoryUser';
import GenericAdapter from '../adapter';
import { IInteraction } from '../interfaces/interactions';

function sender(actions: Array<IInteraction<any>>, type: 'ORDERED' | 'UNORDERED'): Promise<void> {
    console.log(JSON.stringify({ actions, type }));
    return Promise.resolve();
}

export default class TestAdapter extends GenericAdapter {
    public initialization(): void {
        console.log('Nothing here...');
    }
    public inputFunction(): (
        type: string,
        id: string,
        data: { text: string } | string
    ) => Promise<any> {
        const loader = userLoader();
        return async (type: string, id: string, data: { text: string } | string) => {
            const user = await loader(id);
            switch (type) {
                case 'postback':
                    if (typeof data === 'string') {
                        return this.routers.PostbackRouter?.stringPayloadHandler(data, user);
                    }

                    throw new Error("This can't be a payload!");
                case 'message':
                    if (typeof data === 'object' && 'text' in data) {
                        return this.handlers.text
                            ? this.handlers.text(data, undefined, user)
                            : undefined;
                    }

                    throw new Error("This can't be text message!");
            }
        };
    }

    public operations = {
        handover: (): Promise<void> => new Promise<void>((resolve) => resolve())
    };

    public sender = sender;
}
