/*!
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */


function routerFactory({ menu, withoutData, withData}) {
  
  function menuHandler(messaging, payload, user) {
    const id = messaging.sender.id;
    if (menu[payload]) 
      return menu[payload](id, user);
    
    return payloadWithoutData(messaging, payload, user);
  }
  
  function payloadWithoutData(messaging, payload, user) {
    const id = messaging.sender.id;
    const parsedPayload = JSON.parse(payload);
  
    if (withoutData[parsedPayload])
      return withoutData[parsedPayload](id, user);
    
    return payloadWithData(messaging, parsedPayload, user);
  }
  
  function payloadWithData(messaging, payload, user) {
    const id = messaging.sender.id;
    if (withData[payload.type])
      return withData[payload.type](id, user, payload);
  
    throw new Error(`Unknown payload: ${payload}`);
  }

  return {
    menuHandler,
    payloadWithoutData,
    payloadWithData
  };

}

module.exports = routerFactory;
