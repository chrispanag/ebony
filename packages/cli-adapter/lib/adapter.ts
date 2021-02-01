import { GenericAdapter, IInteraction, inMemoryUserLoader } from '@ebenos/framework';
import { Message } from '@ebenos/elements';
import rx from 'rxjs';

import inquirer from 'inquirer';

async function sender(
    actions: Array<IInteraction<any>>,
    type: 'ORDERED' | 'UNORDERED'
): Promise<void> {
    if (type === 'UNORDERED') {
        throw new Error('Not supported!');
    }

    for (const a of actions) {
        if (a.type === 'message') {
            const msg = a.message as Message;
            if (msg.text) {
                console.log(msg.text);
                continue;
            }
            if (msg.attachment) {
                console.log(msg.attachment);
                continue;
            }
        }
    }
}

function prompt(
    input: (type: string, id: string, data: { text: string } | string) => Promise<any>
) {
    inquirer
        .prompt({ type: 'input', message: 'test', name: 'input' })
        .then((answers) => input('message', 'loneuser', { text: answers['input'] }))
        .then(() => prompt(input));
}

export default class CliAdapter extends GenericAdapter {
    initialization(): void {
        const input = this.inputFunction();
        prompt(input);
    }

    public sender = sender;

    public operations = {
        handover: (): Promise<void> => new Promise<void>((resolve) => resolve())
    };

    private inputFunction(): (
        type: string,
        id: string,
        data: { text: string } | string
    ) => Promise<any> {
        const loader = inMemoryUserLoader();
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
}
