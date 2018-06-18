const database = require('./db');

// Set environment variables
const FB_PAGE_ID = process.env.FB_PAGE_ID || '2024859614437257';
const FB_WEBHOOK_KEY = process.env.FB_WEBHOOK_KEY || '123';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin@172.16.238.16';

// Initialize Database
database.init(MONGODB_URI).then(() => {

    // Create the bot object
    const bot = require('./bot');

    // Import modules
    const hodor = require('./modules/hodor');
    bot.addModule(hodor);

    // Initiliaze the webhook
    bot.start({
        port: 3000,
        route: '/fb',
        FB_PAGE_ID,
        FB_WEBHOOK_KEY
    });

}).catch(err => {
    console.log(`[Fatal]: `);
    console.log(err.stack);
    process.exit(1);
});
