const dotenv = require('dotenv');
const database = require('./db');

dotenv.load();

// Set environment variables
const FB_PAGE_ID = process.env.FB_PAGE_ID;
const FB_WEBHOOK_KEY = process.env.FB_WEBHOOK_KEY;
const MONGODB_URI = process.env.MONGODB_URI;

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
