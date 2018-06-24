/**
 * ebony-framework
 * 
 * @module utilities/database
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

const { MongoClient } = require('mongodb');

let db = null; 

module.exports.init = MONGODB_URI => MongoClient.connect(MONGODB_URI).then(database => {
    console.log("[Info] Database connection established");

    db = database.db(database.s.options.dbName);
}).catch(err => {
    throw new Error(`[Fatal] Cannot connect to database ${err.stack}`)
});

module.exports.db = () => {
    if (!db)
        throw new Error(`[Fatal] Database is not initialized!`);

    return db;
}
