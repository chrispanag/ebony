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

export {
    // Interfaces
    Module,
    BotOptions,
    // Important Classes
    Bot,
    User,
    GenericAdapter
};
