import dotenv from 'dotenv';
dotenv.config();

const VIBER_AUTH_TOKEN = process.env.VIBER_AUTH_TOKEN;
if (!VIBER_AUTH_TOKEN) {
    throw new Error('Missing env: No VIBER_AUTH_TOKEN');
}

const WEBHOOK_DOMAIN = process.env.WEBHOOK_DOMAIN;
if (!WEBHOOK_DOMAIN) {
    throw new Error('Missing env: No WEBHOOK_DOMAIN');
}

export const viberConfig = {
    auth_token: VIBER_AUTH_TOKEN,
    webhook_domain: WEBHOOK_DOMAIN
};
