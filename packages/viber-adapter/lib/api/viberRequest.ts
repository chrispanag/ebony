import fetch from 'node-fetch';
import { IViberSendMessageResult } from '../interfaces/api';

const viberUrl = 'https://chatapi.viber.com/pa/';

export default async function viberRequest(
    path: string,
    data: Record<string, any>,
    authToken: string
): Promise<IViberSendMessageResult> {
    const res = await fetch(viberUrl + path, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'X-Viber-Auth-Token': authToken
        }
    });

    const response = (await res.json()) as IViberSendMessageResult;
    if (response.status !== 0) {
        console.log(response);
    }
    return response;
}
