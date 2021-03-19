import { IInteraction } from '@ebenos/framework';
import { sendMessage } from './api/requests';

export default function senderFactory(viberToken: string) {
    return async (
        actions: Array<IInteraction<any>>,
        type: 'ORDERED' | 'UNORDERED'
    ): Promise<void> => {
        if (type === 'UNORDERED') {
            console.log('Not implemented!');
            return;
        }

        for (const a of actions) {
            switch (a.type) {
                case 'message':
                    await sendMessage(a.id, a.message.serialize(), viberToken);
                    break;
                case 'typing_on':
                    console.log('typing_on');
                    break;
                case 'typing_off':
                    console.log('typing_on');
                    break;
                case 'mark_seen':
                    console.log('mark_seen');
                    break;
                case 'notify':
                    console.log('mark_seen');
                    break;
            }
        }
    };
}
