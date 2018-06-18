# EBONy : the Easy BOt Node Framework 
EBONy is module based NodeJS chatbot framework, based on Express for the webserver and on MongoDB for state storage. 

[![Linux Build][travis-image]][travis-url]

It splits each chatbot "flow" (a chatbot's features) on separate and portable modules that can be imported in the main chatbot app.

## Built With

* [**Express**](https://github.com/expressjs/express) - For webhook initialization
* [**Messenger-Platform-Lib**](https://github.com/chrispanag/Messenger-Platform-Lib) - For requests to Facebook
* [**MongoDB**](https://github.com/mongodb/node-mongodb-native) - For state management

## License
[MIT](LICENSE)

[travis-image]:https://travis-ci.com/chrispanag/ebony.svg?token=pVwGyNuxoSPzd2qPW2Dr&branch=master
[travis-url]: https://travis-ci.com/chrispanag/ebony