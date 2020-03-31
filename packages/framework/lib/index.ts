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
import { ActionMiddleware } from './utilities/actions';
import { UserModel, IRouters, EbonyHandlers } from './adapter';
import { WitNLP } from './interfaces/nlp';

export {
    // Interfaces
    Module,
    BotOptions,
    ActionMiddleware,
    WitNLP,
    IRouters,
    EbonyHandlers,
    // Important Classes
    Bot,
    User,
    GenericAdapter,
    UserModel
};
