/*
  Script for installing a FB Chatbot to a page.
  Assumes that all the files are in the ./config directory
  Also, FB_PAGE_TOKEN, WIT_TOKEN & FB_PAGE_ID are environment variables

  Sets up:
    * App-to-Page Subscription  -> Needs FB_PAGE_TOKEN & FB_PAGE_ID
    * Messenger Profile         -> Needs FB_PAGE_TOKEN & ./config/profile.json
    * Wit AI Integration        -> Needs FB_PAGE_TOKEN & WIT_TOKEN + NLP_ENABLED = true

  If the file ./config/profile.json it skips the Messenger Profile Setup
  Also if NLP_ENABLED = false then it skips the Wit.AI Integration

  Written By: Christos Panagiotakopoulos
*/

const NLP_ENABLED = false;

import fetch from 'node-fetch';
import fs from 'fs';

const FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN;
if (!FB_PAGE_TOKEN) {
    throw new Error('missing FB_PAGE_TOKEN');
}

const FB_PAGE_ID = process.env.FB_PAGE_ID;
if (!FB_PAGE_ID) {
    throw new Error('missing FB_PAGE_ID');
}

const qs = 'access_token=' + encodeURIComponent(FB_PAGE_TOKEN);

const promises = [];

try {
    // Read Messenger Profile File
    const body = fs.readFileSync('./config/profile.json');
    console.log("Setting up Messenger Profile...");
    // Send Request to Facebook
    const profilePromise = fetch(`https://graph.facebook.com/v2.11/me/messenger_profile?${qs}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    })
        .then((rsp) => rsp.json())
        .then((json) => {
            // Handle Errors sent from Facebook
            if (json.error) {
                console.error(`Error on Messenger Profile Setup:`);
                console.error(json.error);
            } else {
                console.log("\t\tMessenger Profile Setup: Success! :)");
            }
        })
        .catch((err) => {
            // Handle Errors on the request itself
            console.error(`Error on Messenger Profile Setup: ${err}`);
        });
    promises.push(profilePromise);
} catch (err) {
    // Handle Errors on the reading of the file
    if (err.code === 'ENOENT') {
        console.log("profile.json not found | Skipping Messenger Profile Setup...");
    } else {
        throw new Error("Error reading profile.json");
    }
}

const subscribePromise = fetch(`https://graph.facebook.com/v2.6/${FB_PAGE_ID}/subscribed_apps?${qs}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
})
    .then((rsp) => rsp.json())
    .then((json) => {
        if (json.success) {
            console.log(`Subscribed App to the page with page_id: ${FB_PAGE_ID}`);
        } else {
            console.error(`Error subscribing the bot to the page with id: ${FB_PAGE_ID}`);
            console.error(json.error);
        }
    })
    .catch((err) => {
        throw new Error(err);
    });
promises.push(subscribePromise);

if (NLP_ENABLED) {
    const WIT_TOKEN = process.env.WIT_TOKEN;
    if (!WIT_TOKEN) {
        throw new Error('missing WIT_TOKEN');
    }

    const nlpPromise = fetch(`https://graph.facebook.com/v2.11/me/nlp_configs?nlp_enabled=${NLP_ENABLED}&custom_token=${WIT_TOKEN}&${qs}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((rsp) => rsp.json())
        .then((json) => {
            if (json.success) {
                console.log(`Connected app with Wit.AI successfully`);
            } else {
                console.error(`Error connecting the app to Wit.AI`);
                console.error(json.error);
            }
        })
        .catch((err) => {
            throw new Error(err);
        });

    promises.push(nlpPromise);
}

// Wait for all the promises to resolve (for all the jobs to end) and then exit gracefully
Promise.all(promises).then(() => {
    console.log("The bot has been installed successfully");
    process.exit(0);
})
    .catch(() => {
        console.error("There were errors in the installation of the bot");
        process.exit(1);
    });
