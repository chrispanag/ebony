import User from "../models/User";

/**
 * ebony-framework
 * 
 * @module handlers/attachment
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

const { stickers } = require('messenger-platform-node');

function defaultYes_noAnswer() {
  return Promise.resolve();
}

/**
 * @param {function} locationHandler - A Location Handler function
 * @param {function} yes_noAnswer - A function that handles yes/no answers
 * @param {object} messages - The actions object
 * @param {object} fb - The fb object
 * @returns {function} - Returns an attachmentHandler
 */
export default function attachmentHandlerFactory(locationHandler: (...params: any) => Promise<any>, yes_noAnswer: (...params: any) => Promise<any> = defaultYes_noAnswer, messages: any = {}, fb: any) {
  const { defaultThumbsUp, attachmentDefault } = messages;
  const { startsTyping } = fb;

  return (id: string, attachment: any, user: User) => startsTyping(id).then(() => {

    if (attachment.payload) {
      if ((attachment.payload.sticker_id == stickers.thumbsUpSmall) || (attachment.payload.sticker_id == stickers.thumbsUpMedium) || (attachment.payload.sticker_id == stickers.thumbsUpLarge)) {
        if (user.context.expecting == "yes_no")
          return yes_noAnswer(id, user, "positive");

        return defaultThumbsUp(id, user);
      }
      // Location
      if (attachment.payload.coordinates)
        return locationHandler(id, user, attachment.payload.coordinates);
    }

    return attachmentDefault(id, user);
  });
}

