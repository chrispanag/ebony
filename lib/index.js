/**
 * ebony-framework
 * 
 * @module ebony
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

'use strict';

const Bot = require('./bot');
const webhookFactories = require('./webhooks');
const menuProcessorFactory = require('./utilities/menuProcessor');
const userModelFactory = require('./models/user');

const database = require('./utilities/database');

const { Message, elements } = require('./sendAPI');

module.exports = {
    Bot,
    utilities: {
        menuProcessor: menuProcessorFactory(),
        database
    },
    models: {
        userModelFactory
    },
    sendAPI: {
        Message,
        elements
    },
    webhookFactories
};
