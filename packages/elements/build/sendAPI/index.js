"use strict";
/**
 * ebony-framework
 *
 * @module sendAPI
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const attachments = __importStar(require("./attachments"));
const buttons = __importStar(require("./buttons"));
const quickreplies = __importStar(require("./quickreplies"));
const templates = __importStar(require("./templates"));
const message_1 = require("./message");
exports.Message = message_1.Message;
const elements = Object.assign(Object.assign(Object.assign(Object.assign({}, buttons), attachments), quickreplies), templates);
exports.elements = elements;
//# sourceMappingURL=index.js.map