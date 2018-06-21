/**
 * ebony-framework
 * 
 * A module that includes the various Button types
 * 
 * @module sendAPI/buttons 
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

'use strict';

/**
 * @typedef {object} SerializedButton 
 * @property {string} type
 * @property {...string} params
 */

/** A General button class */
class Button {

    /**
     * Creates a generic button
     * @param {string} type - The type of the button
     * @param {object} params - The various parameters the button includes
     */
    constructor(type, params = {}) {
        this.type = type;
        this.params = params;
    }

    /**
     * @returns {SerializedButton} - An object that is understandable by Facebook
     */
    serialize() {
        const basicButton = {
            type: this.type,
        }

        return Object.assign(basicButton, this.params);
    }
}

/** 
 * A URL Button 
 * @extends Button
*/
class UrlButton extends Button {

    /**
     * Create a UrlButton
     * @param {string} title - The title of the button
     * @param {string} url - The url the button points to
     * @param {?string} webview_height_ratio - The height of the webview viewport
     */
    constructor(title, url, webview_height_ratio = "full") {
        super("web_url", {
            title,
            url,
            webview_height_ratio
        });
    }
}


/** 
 * A Call Button 
 * @extends Button
 */
class CallButton extends Button {

    /**
     * Create a CallButton
     * @param {string} title - The title of the button
     * @param {string} payload - The phone number
     */
    constructor(title, payload) {
        super("phone_number", {
            title,
            payload
        });
    }
}

/** 
 * A Share button 
 * @extends Button
 */
class ShareButton extends Button {
    constructor(generic = null) {
        let params = {}
        if (generic)
            params = {
                share_contents: {
                    attachment: JSON.stringify(generic)
                }
            }

        super("element_share", params);
    }
}

/** 
 * A Postback Button 
 * @extends Button
*/
class PostbackButton extends Button {

    /**
     * Create a PostbackButton
     * @param {string} title - The title of the button
     * @param {object|string} payload - The payload returned when the button is pushed
     */
    constructor(title, payload = "") {
        let serializedPayload = payload;
        if (typeof payload === 'object')
            serializedPayload = JSON.stringify(payload);

        super("postback", {
            title,
            payload: serializedPayload
        });
    }
}

module.exports = {
    UrlButton,
    CallButton,
    ShareButton,
    PostbackButton
};
