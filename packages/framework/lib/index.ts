/**
 * ebony-framework
 *
 * @module ebony
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import Bot from './bot';
import User from './models/User';
import GenericAdapter from './adapter';
import { Module, BotOptions } from './interfaces/bot';
import { ISerializable } from './interfaces/elements';
import { ActionMiddleware } from './utilities/actions';
export * from './interfaces/interactions';
import { UserModel, IRouters, EbonyHandlers, IBaseMessage, IBaseMessageOptions } from './adapter';
import { WitNLP } from './interfaces/nlp';

export { GenericAttachment } from './interfaces/attachment'

export {
    // Interfaces
    Module,
    BotOptions,
    ActionMiddleware,
    WitNLP,
    IRouters,
    EbonyHandlers,
    ISerializable,
    IBaseMessage,
    IBaseMessageOptions,
    // Important Classes
    Bot,
    User,
    GenericAdapter,
    UserModel
};
