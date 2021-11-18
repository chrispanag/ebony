import fetch from 'node-fetch';
import { WitNLP } from '@ebenos/framework/build/interfaces/nlp';

export class Wit {
    url: (apiKey: string) => string = (apiKey: string) =>
        'https://api.wit.ai/' + apiKey + '?v=20200513';
    witToken: string;
    constructor(WitToken: string) {
        this.witToken = WitToken;
    }

    private async request(
        apiKey: string,
        options: {
            method: string;
            data?: any;
            headers?: any;
            params?: string;
        }
    ) {
        options.headers = options.headers || {};
        options.headers['Accept'] = 'application/json';
        options.headers['Content-Type'] = 'application/json';
        options.headers['Authorization'] = 'Bearer ' + this.witToken;

        const requestURL: string =
            options.method === 'GET' && options.params
                ? this.url(apiKey) + options.params
                : this.url(apiKey);

        return fetch(requestURL, options)
            .then(checkStatus)
            .then((data: any) => data as WitNLP)
            .catch((err: any) => undefined);
    }
    public async Meaning(message: string): Promise<WitNLP | undefined> {
        const stats = await this.request('message', {
            method: 'GET',
            params: '&q=' + encodeURI(message)
        });
        return stats;
    }
}

function checkStatus(response: any) {
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    }

    const error = new Error(response.statusText);
    throw error;
}
