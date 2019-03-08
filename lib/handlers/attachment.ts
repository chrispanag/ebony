/**
 * ebony-framework
 * 
 * @module handlers/attachment
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

import User from "../models/User";
import { GenericAttachment } from "../interfaces/attachment";

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

  return (user: User, attachment: GenericAttachment) => startsTyping(user.id).then(() => {

    if (attachment.payload) {
      if ((attachment.payload.sticker_id == stickers.thumbsUpSmall) || (attachment.payload.sticker_id == stickers.thumbsUpMedium) || (attachment.payload.sticker_id == stickers.thumbsUpLarge)) {
        if (user.context.expecting == "yes_no")
          return yes_noAnswer(user.id, user, "positive");

        return defaultThumbsUp(user.id, user);
      }
      // Location
      if (attachment.payload.coordinates)
        return locationHandler(user.id, user, attachment.payload.coordinates);
    }

    return attachmentDefault(user.id, user);
  });
}

