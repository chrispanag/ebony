# This tutorial worked with a previous version of Ebony

# How to run the Hodor Bot with Ngrok

This tutorial assumes that you already have a MongoDB database running and have setted up a Facebook app that uses the Messenger Platform.

You can learn how to set up your Messenger Platform Facebook app and the basics around it, at the official [**Facebook Developers Messenger Platform tutorial**](https://developers.facebook.com/docs/messenger-platform/getting-started) (up to step 4).

## Setting the environment variables

Create a `.env` file in the `hodor-bot` directory that contains the following variables:

**FB_APP_SECRET:**

Access your app in developers.facebook.com

`Settings → Basic → App Secret.`

**FB_PAGE_TOKEN:**

Access your app in developers.facebook.com

`Messenger → Settings → Page Access Token`

**FB_PAGE_ID:**

Access your page in facebook.com

`About → Scroll Down – Page Id`

**MONGODB_URI:**

Link to your MongoDB database

**FB_WEBHOOK_KEY:**

You choose it yourself.

At the end the `.env` file will look like this:

```env
FB_PAGE_ID=<FB_PAGE_ID>
FB_WEBHOOK_KEY=<FB_WEBHOOK_KEY>
MONGODB_URI=<MONGODB_URI>
FB_PAGE_TOKEN=<FB_PAGE_TOKEN>
FB_APP_SECRET=<FB_APP_SECRET>
```

## Using ngrok for tunneling from a public URL to our application

1. Download and extract ngrok.
2. `cd` at the folder you extracted the executable.
3. Run: `./ngrok http 3000`

You'll need the https link `https://xxxx.ngrok.io`.

*Note: Don't terminate this terminal session!.*

Now you should go to `developers.facebook.com → Webhooks` and click on **Edit Subscription**.

* On the **Callback URL** field you paste the link from ngrok and add the `/fb` route at the end of the link (the link should be like: `https://xxxx.ngrok.io/fb`).

* On the **Verify Token** field you type the `FB_WEBHOOK_KEY` that you chose previously.

### NOTE1: Don't hit the Verify button yet! we'll do it on the next step ;)

NOTE2: Everytime you close ngrok, the next time it generates a new link and you should replace the **Callback URL** with that.

## Getting the Hodor-Bot started

Access the `ebony` folder and run `npm install`.

After that, access `./examples/hodor-bot` and, again, run `npm install`.

Congrats! Now the Hodor-Bot is ready to run.

Just run: `npm start` inside the `./examples/hodor-bot` directory for it to start accepting messages.

If this is the first time you run the bot then **Hit the Verify Button on your webhook!**

Whenever you send to it _Hodor_, it replies the meaningful _Hodor?_.

## How it works

Go to the `./modules/hodor` directory and open in an editor of your choice (we suggest VS Code) the `text.js` file.

In it you can see the following:

```javascript
const bot = require('../../bot');

module.exports = [{ regex: /HODOR/, action: (id, user) => bot.actions.exec('hodor', id, user) }];
```

On line 3 you can see an array of regex rules for identifying text messages the user sends to the bot. It's an array of JS Objects.

You define the **regular expression** through the `regex` property and the corresponding **action** that the bot should do, through the `action` property.

For a regex crash course you can check [this link](https://www.w3schools.com/Jsref/jsref_obj_regexp.asp)

The most important thing in the `action` property is the first argument of the `bot.actions.exec` function. For our example, it's `'hodor'`.

`'hodor'` is the name of the action the bot should execute, when it receives a text-message to which the regex rule applies.

Now open the `actions.js` file:

```javascript
const { Message } = require('../../../..').sendAPI;

const bot = require('../../bot');

function hodor(id, user) {
    const message = new Message({
        text: "Hodor?"
    });
    return bot.send(id, message);
}

module.exports = {
    hodor
}
```

The function `hodor` is the function the bot executes when it receives `hodor` from the user. It should send back the text message `"Hodor?"`.

In order to do that you define a new Message instance (a Message object is defined from Ebony) and as an argument you type the object:

```javascript
{
    text: "Hodor?"
}
```

And then you return the return-value of the function `bot.send(id, message)` (it returns a Promise)

Don't forget to export the function, in order for it to be "visible" for the rest of files.

## :clap: Acknowledgments :clap:

_Special thanks to [**johnretsas**](https://github.com/johnretsas) for writing this tutorial_