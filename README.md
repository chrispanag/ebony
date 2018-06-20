# EBONy : the Easy BOt Node Framework 
EBONy is module based NodeJS chatbot framework, based on Express for the webserver and on MongoDB for state storage. 

[![NPM Version][npm-image]][npm-url] [![Build][travis-image]][travis-url]

It splits each chatbot "flow" (a chatbot's features) on separate and portable modules that can be imported in the main chatbot app.

## Main Features

* Out of the box support for the Handover Protocol
* Wit.ai built-in NLP support
* Support for basic Yes/No answers (Wit.ai Sentiment Entity)
* Support for location attachments
* Text Regex rules
* Portable modules 

## Getting Started 

Documentation for the EBONy framework is a work in progress (and soon to be released :D). For now you can check out the examples folder for some bots that showcase the functionality of the framework. 

Also, you can check out [this tutorial](./docs/tutorials/hodor-bot.md) that describes how to get started with the hodor-bot example! 

(Special thanks to **JohnGreco** for writing this tutorial)

## Built With

* [**Express**](https://github.com/expressjs/express) - For webhook initialization
* [**messenger-platform-node**](https://github.com/chrispanag/messenger-platform-node) - For requests to Facebook
* [**MongoDB**](https://github.com/mongodb/node-mongodb-native) - For state management

## License
[MIT](LICENSE)

[travis-image]:https://travis-ci.org/chrispanag/ebony.svg?branch=master
[travis-url]: https://travis-ci.org/chrispanag/ebony
[npm-image]: https://img.shields.io/npm/v/ebony-framework.svg
[npm-url]: https://www.npmjs.com/package/ebony-framework