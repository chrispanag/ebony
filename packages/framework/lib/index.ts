/**
 * ebony-framework
 *
 * @module ebony
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2020 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import Bot from './bot';
import User from './models/User';
import DatabaseUser, { userLoader as databaseUserLoader } from './models/DatabaseUser';
import InMemoryUser, { userLoader as inMemoryUserLoader } from './models/InMemoryUser';
import GenericAdapter from './adapter';
import TestAdapter from './tests/test-adapter';
export { Module, BotOptions, Scenario } from './interfaces/bot';
export { ISerializable } from './interfaces/elements';
export { ActionMiddleware } from './utilities/actions';
export { IRouters, EbonyHandlers, IBaseMessage, IBaseMessageOptions } from './adapter';
export { WitNLP } from './interfaces/nlp';
export { GenericAttachment } from './interfaces/attachment';
export { ITrackingData } from './interfaces/trackingData';
export * from './interfaces/interactions';
export * from './modules';

export {
    Bot,
    User,
    GenericAdapter,
    DatabaseUser,
    databaseUserLoader,
    InMemoryUser,
    inMemoryUserLoader,
    TestAdapter
};
