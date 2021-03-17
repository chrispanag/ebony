import { IInteraction } from '@ebenos/framework';

export default function sender(
    actions: Array<IInteraction<any>>,
    type: 'ORDERED' | 'UNORDERED'
): Promise<void> {
    return Promise.resolve();
}
