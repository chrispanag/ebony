# EBONy : the Easy BOt Node Framework 
EBONy is module based NodeJS chatbot framework, based on Express for the webserver and on MongoDB for state storage. 

[![Linux Build][travis-image]][travis-url]

It splits each chatbot "flow" (a chatbot's features) on separate and portable modules that can be imported in the main chatbot app.

## Getting Started 

Documentation for the EBONy framework is a work in progress (and soon to be released :D). For now you can check out the examples folder for some bots that showcase the functionality of the framework. 

## Built With

* [**Express**](https://github.com/expressjs/express) - For webhook initialization
* [**messenger-platform-node**](https://github.com/chrispanag/messenger-platform-node) - For requests to Facebook
* [**MongoDB**](https://github.com/mongodb/node-mongodb-native) - For state management

## License
[MIT](LICENSE)

[travis-image]:https://travis-ci.com/chrispanag/ebony.svg?token=pVwGyNuxoSPzd2qPW2Dr&branch=master
[travis-url]: https://travis-ci.com/chrispanag/ebony