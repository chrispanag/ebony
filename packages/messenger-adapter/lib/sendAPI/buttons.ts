import { GenericTemplate } from "./templates";

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

/**
 * @typedef {object} SerializedButton 
 * @property {string} type
 * @property {...string} params
 */

/** A General button class */
export class Button {

    public type: string;
    public params: {};

    /**
     * Creates a generic button
     * @param {string} type - The type of the button
     * @param {object} params - The various parameters the button includes
     */
    constructor(type: string, params: {} = {}) {
        this.type = type;
        this.params = params;
    }

    /**
     * @returns {SerializedButton} - An object that is understandable by Facebook
     */
    serialize(): { type: string } {
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
export class UrlButton extends Button {

    /**
     * Create a UrlButton
     * @param {string} title - The title of the button
     * @param {string} url - The url the button points to
     * @param {?string} webview_height_ratio - The height of the webview viewport
     */
    constructor(title: string, url: string, webview_height_ratio = "full", messenger_extensions: boolean = false) {
        super("web_url", {
            title,
            url,
            webview_height_ratio,
            messenger_extensions
        });
    }
}


/** 
 * A Call Button 
 * @extends Button
 */
export class CallButton extends Button {

    /**
     * Create a CallButton
     * @param {string} title - The title of the button
     * @param {string} payload - The phone number
     */
    constructor(title: string, payload: string) {
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
export class ShareButton extends Button {
    constructor(generic: GenericTemplate | null = null) {
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
export class PostbackButton extends Button {

    /**
     * Create a PostbackButton
     * @param {string} title - The title of the button
     * @param {object|string} payload - The payload returned when the button is pushed
     */
    constructor(title: string, payload: any | string = "") {
        let serializedPayload = payload;
        if (typeof payload === 'object')
            serializedPayload = JSON.stringify(payload);

        super("postback", {
            title,
            payload: serializedPayload
        });
    }
}