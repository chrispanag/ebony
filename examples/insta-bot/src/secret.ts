import dotenv from 'dotenv';
dotenv.config();

const FB_PAGE_ID = process.env.FB_PAGE_ID;
if (!FB_PAGE_ID) {
    throw new Error('Missing env: No FB_PAGE_ID');
}

const FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN;
if (!FB_PAGE_TOKEN) {
    throw new Error('Missing env: No FB_PAGE_TOKEN');
}

const FB_APP_SECRET = process.env.FB_APP_SECRET;
if (!FB_APP_SECRET) {
    throw new Error('Missing env: No FB_APP_SECRET');
}

const FB_APP_ID = process.env.FB_APP_ID;
if (!FB_APP_ID) {
    throw new Error('Missing env: No FB_APP_ID');
}

export const fbConfig = {
    pageId: FB_PAGE_ID,
    pageToken: FB_PAGE_TOKEN,
    appSecret: FB_APP_SECRET,
    app_id: FB_APP_ID,
    webhookKey: '123'
};
