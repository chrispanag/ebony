/*!
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

const { stickers } = require('fblib');

function defaultYes_noAnswer() {
  return Promise.resolve();
}

function attachmentHandlerFactory(locationHandler, yes_noAnswer = defaultYes_noAnswer, messages = {}, fb) {
  const { defaultThumbsUp, attachmentDefault } = messages;
  const { startsTyping } = fb;

  return (id, attachment, user) => startsTyping(id).then(() => {

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

module.exports = attachmentHandlerFactory;
