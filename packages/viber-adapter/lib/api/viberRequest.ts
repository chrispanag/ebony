import fetch from 'node-fetch';

const viberUrl = 'https://chatapi.viber.com/pa/';

export default async function viberRequest(
    path: string,
    data: Record<string, any>,
    authToken: string
): Promise<any> {
    const res = await fetch(viberUrl + path, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'X-Viber-Auth-Token': authToken
        }
    });

    const response = await res.json();
    return response;
}
